import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber:{
      type: String,
      // unique:true
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt: {
      type: Date,
      expires: 6, 
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });      //TTL

otpSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

otpSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
