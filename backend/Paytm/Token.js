import https from "https";
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const PaytmChecksum = require("./PaytmChecksum");

var paytmParams = {};

paytmParams.body = {
  requestType: "Payment",
  mid: process.env.MID,
  orderId: process.env.ORDER_ID,
  callbackUrl: process.env.CALLBACK_URL + process.env.ORDER_ID,
  websiteName: process.env.WEBSITE_NAME,
  txnAmount: {
    value: "101.00",
    currency: "INR",
  },
  userInfo: {
    custId: "CUST_001",
  },
};

/*
 * Generate checksum by parameters we have in body
 * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
 */

PaytmChecksum.generateSignature(
  JSON.stringify(paytmParams.body),
  process.env.MKEY
).then(function (checksum) {
  paytmParams.head = {
    signature: checksum,
  };

  var post_data = JSON.stringify(paytmParams);

  var options = {
    /* for Staging */
    hostname: "securegw-stage.paytm.in",

    /* for Production */
    // hostname: 'securegw.paytm.in',

    port: 443,
    path: "/theia/api/v1/initiateTransaction?mid=ZpsqDd42488117746297&orderId=ACTIVE_ORDER_1",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": post_data.length,
    },
  };

  var response = "";
  var post_req = https.request(options, function (post_res) {
    post_res.on("data", function (chunk) {
      response += chunk;
    });

    post_res.on("end", function () {
      console.log("Response: ", response);
    });
  });

  post_req.write(post_data);
  post_req.end();
});
