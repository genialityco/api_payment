import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["admin", "payer"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
