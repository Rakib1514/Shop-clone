const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true, immutable: true },
    email: { type: String, require: true, unique: true },
    address: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female"] },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    image: { type: String },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
