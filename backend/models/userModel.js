import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: tring, required: true },
    email: { type: tring, required: true, unique: true },
    password: { type: tring, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false },
);

const usrrM0odel = mongoose.model.user || mongoose.model("user", userSchema);
