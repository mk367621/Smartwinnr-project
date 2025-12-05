import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "viewer"], default: "viewer" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
