import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,

    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });      //TTL

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
