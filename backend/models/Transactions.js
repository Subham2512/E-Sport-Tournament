import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  txnAmount: {
    type: Number,
  },

  txnStatus: {
    type: String,
    default: "Pending",
  },

  txnId: {
    type: String,
  },

  orderId: {
    type: String,
  },

  userId: {
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
