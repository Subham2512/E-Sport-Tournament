import express from "express";
import Transaction from "../models/Transactions.js";
const router = express.Router();

router.post("/get-transactions", async (req, res) => {
  const { userId } = req.body;
  try {
    const transactions = await Transaction.find(userId);
    if (!transactions) {
      console.log("No transactions found");
      return;
    }
    return res.json({
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
  }
});

router.post("/failed-transaction", async (req, res) => {
  // console.log(req.body);
  try {
    await Transaction.findOneAndUpdate(
      { orderId: req.body.error.metadata.order_id },
      {
        $set: {
          txnId: req.body.error.metadata.payment_id,
          txnStatus: "failed",
        },
      }
    );
    // console.log("Update result:", result);
    // res.status(200).send("spotLeft updated successfully");
  } catch (error) {
    console.error("Error updating spotLeft:", error);
    // res.status(500).send("Error updating spotLeft");
  }
});

export default router;
