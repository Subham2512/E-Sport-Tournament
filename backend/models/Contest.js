import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  spotleft: { type: Number, default: 100, min: 0, max: 100 },
  roomID: { type: String },
  roomPass: { type: String },
  userJoined: { type: Array, default: [] },
});

const Contest = mongoose.model("Contest", contestSchema);

export default Contest;
