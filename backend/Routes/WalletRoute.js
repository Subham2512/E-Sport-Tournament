import express from "express";
import Wallet from "../models/Wallet.js";
import crypto from "crypto";
import axios from "axios";
import Razorpay from "razorpay";
// import Constants from "../Constant.js";
const router = express.Router();
import Transaction from "../models/Transactions.js";
import dotenv from "dotenv";

dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret: process.env.YOUR_KEY_SECRET,
});

router.post("/add-money", (req, res) => {
  // ////////////////////RazorPay integration///////////////////////
  var instance = new Razorpay({
    key_id: process.env.YOUR_KEY_ID,
    key_secret: process.env.YOUR_SECRET,
  });
  var options = {
    amount: parseInt(req.body.amount) * 100,
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      console.log(order);
    }
    const newTrasaction = new Transaction({
      orderId: order.id,
      txnAmount: req.body.amount,
      txnStatus: "Pending",
      txnSignature: "",
      txnId: "",
      // username: req.body.username,
    });
    newTrasaction.save();
    return res.json(order);
  });
  /////////////////////////RazorPay ends////////////////////////////////////////
  // ///////////Paytm integration /////////////////
  // var orderId = "OREDRID_98765";
  // var paytmParams = {};
  // console.log(process.env.MID)
  // paytmParams.body = {
  //     "requestType": "Payment",
  //     "mid": process.env.MID,
  //     "websiteName": "WEBSTAGING",
  //     "orderId": orderId,
  //     "txnAmount": {
  //         "value": "1.00",
  //         "currency": "INR",
  //     },
  //     "userInfo": {
  //         "custId": "CUST_001",
  //     },
  // };
  /*
   * Generate checksum by parameters we have in body
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  // PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY).then(function (checksum) {
  //     console.log(checksum);
  //     paytmParams.head = {
  //         "signature": checksum
  //     };
  //     var post_data = JSON.stringify(paytmParams);
  //     var options = {
  //         /* for Staging */
  //         hostname: 'securegw-stage.paytm.in',
  //         /* for Production */
  //         // hostname: 'securegw.paytm.in',
  //         port: 443,
  //         path: '/theia/api/v1/initiateTransaction?mid=' + process.env.MID + '&orderId=' + orderId,
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Content-Length': Buffer.byteLength(post_data)
  //         }
  //     };
  //     var response = "";
  //     var post_req = https.request(options, function (post_res) {
  //         post_res.on('data', function (chunk) {
  //             response += chunk;
  //         });
  //         post_res.on('end', function () {
  //             console.log('Response: ', response);
  //         });
  //     });
  //     post_req.write(post_data);
  //     post_req.end();
  // });
  //   ////////////////////////////////paytm end////////////////////////
});

router.post("/verify-payment", async (req, res) => {
  console.log(req.body.data);
  /////////////RazorPay///////////////////
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.YOUR_SECRET)
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      try {
        await Transaction.findOneAndUpdate(
          { orderId: razorpay_order_id },
          {
            $set: {
              txnId: razorpay_payment_id,
              txnStatus: "Success",
            },
          }
        );
        // res.status(200).send("spotLeft updated successfully");
      } catch (error) {
        console.error("Error updating Transaction:", error);
        // res.status(500).send("Error updating spotLeft");
      }
      try {
        const amount = parseInt(req.body.amount);
        await Wallet.updateOne(
          { username: req.body.username },
          {
            $inc: { balance: amount },
          }
        );
        // res.status(200).send("spotLeft updated successfully");
      } catch (error) {
        console.error("Error adding Balance:", error);
        // res.status(500).send("Error updating spotLeft");
      }
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
  //////////////Razorpay End////////////////////
});

router.post("/withdraw-money", async (req, res) => {
  const { userId, amount } = req.body;
  //////////////Razorpay withdrawl////////////////////
  console.log(username, amount);
  // Fetch user's account details and balance from your database
  const userReq = await axios.post(
    "http://localhost:5000/get-user-profile",
    {
      userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user = userReq.data.user;
  console.log(user.name);
  if (user.balance >= amount) {
    // Create a withdrawal request using Razorpay API
    const withdrawal = await razorpay.transfers.create({
      account: "123456789012",
      amount: amount * 100, // Amount in paise
      currency: "INR",
      notes: {
        userId: user.username,
        purpose: "Withdrawal",
      },
    });
    ////////////Razorpay End////////////////////
    console.log(withdrawal);
    // Update user's balance in your database
    try {
      const response = await axios.post(
        "http://localhost:5000/update-balance",
        {
          userId,
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.send(response.data);
    } catch (error) {
      res.status(500).send("Error making request");
    }

    //   return res.json({ message: "Withdrawal initiated successfully." });
    // } else {
    //   res.status(400).json({ error: "Insufficient balance." });
  }
});

router.post("/get-balance", async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  try {
    const foundWallet = await Wallet.findOne({ userId: userId });
    // console.log("Found user:", foundWallet);
    if (foundWallet) {
      return res.json({ balance: foundWallet.balance });
    } else {
      // console.log("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

router.post("/update-balance", async (req, res) => {
  const { userId, amount } = req.body;
  // console.log(username, amount);
  try {
    const user = await Wallet.findOne({ userId: userId });
    if (!user) {
      // console.log("User not found");
      return;
    }

    // Increment the balance by the provided amount
    user.balance -= amount;

    // Save the updated user
    await user.save();
    return res.status(200).json({ message: "Money deducted" });
  } catch (error) {
    return res.status(401).json({ message: "Money Not deducted" });
  }
});

export default router;
