import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import nodemailer from 'nodemailer';
import Follow from "../models/followModel.js"


import { APP_PASSWORD, ADMIN_EMAIL } from "../config/connections.js";

// to login the user
const authUser = asyncHandler(async (req, res) => {
  const { email, password, gmail } = req.body;

  if (gmail) {                                                          //google login
    const user = await User.findOne({ email: email })
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400)
      throw new Error("Invalid email")
    }
  } else {                                                                //login by filling form
    const user = await User.findOne({ email: email });                    //checks if the user exists
    if (user && (await user.matchPassword(password))) {                   //checks if the passwords match
      generateToken(res, user._id);                                       //generates jwt token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // profileImage: user.profileImage,
      });
      const followExist = await Follow.findOne({ userId: user._id })
      if (!followExist) { const createUser = await Follow.create({ userId: user._id }) }
    } else {
      res.status(400)
      throw new Error("Invalid email and password")
    }
  }
});

// to send the verification otp to mail
const sendVerifyMail = async (name, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: ADMIN_EMAIL,
        pass: APP_PASSWORD
      },
    })

    const mailOptions = {
      from: ADMIN_EMAIL,
      to: email,
      subject: "OTP for verification mail",

      html: `<p> hi ${name},Use this otp ${otp} to login</p>`,
      text: `hi ${name},Use this otp ${otp} to login`,
    }

    await transporter.sendMail(mailOptions)

    // res.status(200).json({message:"Email sent for verification"})


    // if(error){
    //   console.log(error);
    // }else{
    //   console.log("OTP has been sent to your email-", info.response);
    // }

  } catch (error) {
    console.log(error);
  }
}
// to sign up the user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, password, gmail } = req.body;

  // to register through google mail directly
  if (gmail) {

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400);

      throw new Error("User already exist");
    }

    const user = await User.create({
      name,
      email
    });
    const createUser = await Follow.create({ userId: user._id })

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }

  // to register through direct signup form
  else {
    const userExist = await User.findOne({ email: email });  //checks if the user exists already
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }


    const otp = Math.floor(1000 + Math.random() * 9000)


    sendVerifyMail(req.body.name, req.body.email, otp)


    const user = await Otp.create({                       //saving the user data in otp collection
      name,
      email,
      phoneNumber,
      otp,
      createdAt: Date.now(),

    });
    res.status(201).json({
      user
    });

  }
});

const resendOtp = asyncHandler(async (req, res) => {
  try {
    const { otpname, otpemail, otpno, otppass } = req.body;

    const otpExist = await Otp.findOne({ email: req.body.otpemail });
    const otp = Math.floor(1000 + Math.random() * 9000)

    const resendOTP = await Otp.findOneAndDelete({ email: req.body.otpemail })

    sendVerifyMail(req.body.otpname, req.body.otpemail, otp)
    const user = await Otp.create({                       //saving the user data in otp collection
      name: otpname,
      email: otpemail,
      phoneNumber: otpno,
      otp,
      createdAt: Date.now(),

    });

    res.status(200).json({ message: "Otp sent" })

  } catch (err) {
    console.log(err);
  }
})

// to check the otp
const checkOtp = asyncHandler(async (req, res) => {
  try {

    const otpUser = await Otp.findOne({ email: req.body.otpemail });

    if (otpUser.otp == req.body.otp) {

      const user = await User.create({                       //saving the user data in otp collection
        name: req.body.otpname,
        email: req.body.otpemail,
        phoneNumber: req.body.otpno,
        password: req.body.otppass
      });

      res.status(201).json({
        user
      });
    }
  } catch (error) {
    console.log(error);
  }
})

// to logout the user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

const checkUserBlocked = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.query._id })
    if (user.isBlocked === true) {
      var Blocked = true
    } else {
      var Blocked = false
    }
    res.json({ Blocked })
  } catch (err) {
    console.log(err);
  }
})
// const follower = asyncHandler(async (req, res) => {
//   try {
//     if (req.body.response === "accept") {
//       const user = req.body.userId

//       const userInfo = req.body.userInfo._id

//       const userExist = await Follow.findOne({ userId: userInfo })
//       if (!userExist) {
//         const createUser = await Follow.create({ userId: userInfo })
//       }

//       const followerExist = await Follow.findOne({ userId: user })
//       if (!followerExist) {
//         const createFollower = await Follow.create({ userId: userExist })
//       }

//       const follow = await Follow.findOne({
//         userId: userInfo,
//         following: { $in: user }
//       });

//       if (follow) {
//         const unfollow = await Follow.findOneAndUpdate(
//           { userId: userInfo },
//           { $pull: { following: user } },
//           { new: true })
//         const unfollower = await Follow.findOneAndUpdate(
//           { userId: user },
//           { $pull: { follower: userInfo } },
//           { new: true })
//         const notification = await Notification.findOneAndDelete({
//           type: "follow",
//           sender: userInfo,
//           receiver: user,
//         })
//         res.status(200).json({ message: "Unfollowed successfully" })
//       } else {

//         const follow = await Follow.findOneAndUpdate(
//           { userId: userInfo },
//           { $push: { following: user } },
//           { new: true })
//         const follower = await Follow.findOneAndUpdate(
//           { userId: user },
//           { $push: { follower: userInfo } },
//           { new: true }
//         )
//         const notification = await Notification.create({
//           type: "follow",
//           content: " has started following you",
//           // resource:[user._id],
//           sender: userInfo,
//           receiver: user
//         })
//         res.status(200).json({ message: "Followed successfully" })
//       }
//     } else {
//       const user = req.body.userId
//       const userInfo = req.body.userInfo._id

//       const followRequest = await Request.findOneAndDelete({ sender: user, receiver: userInfo })
//     }
//   } catch (err) {
//     console.log(err);
//   }
// })
export {
  authUser,
  registerUser,
  logoutUser,
  resendOtp,
  checkOtp,
  checkUserBlocked, 
};
