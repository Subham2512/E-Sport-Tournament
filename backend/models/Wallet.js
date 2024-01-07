import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    min: 0,
  },

  userId: {
    type: String,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
