import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String || Number,
  },
  email: {
    type: String || Number,
  },
  mobile: {
    type: Number,
  },
  password: {
    type: String || Number,
  },
  dob: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    name: { type: String, default: "" },
    uri: { type: Buffer, default: null },
    type: { type: String, default: "" },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
