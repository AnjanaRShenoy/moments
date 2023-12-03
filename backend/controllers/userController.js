import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import nodemailer from 'nodemailer';
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
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
    console.log(email);
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400);
      console.log("User already exist");
      throw new Error("User already exist");
    }

    const user = await User.create({
      name,
      email
    });

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
    const otp = Math.floor(1000 + Math.random() * 9000)     //sends otp to mail
    sendVerifyMail(req.body.name, req.body.email, otp)

    const user = await Otp.create({                       //saving the user data in otp collection
      name,
      email,
      phoneNumber,
      otp
    });
    res.status(201).json({
      user
    });

  }
});

// to check the otp
const checkOtp = asyncHandler(async (req, res) => {
  try {
    const otpUser = await Otp.findOne({ email: req.body.email });
    console.log(otpUser.otp, req.body.otp);
    if (otpUser.otp == req.body.otp) {
      console.log("entered");
      const user = await User.create({                       //saving the user data in otp collection
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
      });
      console.log(user, "user");
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



// to get the user profile for showing profile
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = {
//     _id: req.user._id,
//     name: req.user.name,
//     email: req.user.email,

//   };
//   res.status(200).json(user);
// });

// // to make changes in profile
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) user.password = req.body.password;
//     const updatedUser = await user.save();
//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// to change profile picture
const updateUserImage = asyncHandler(async (req, res) => {
  try {
    if (req.file) {
      User.findByIdAndUpdate(
        { _id: req.body.id },
        { profileImage: req.file.filename }
      ).catch(err => {
        console.log(err.message);
      })
      res.status(200).json({ profileImage: req.file.filename })
    }
  } catch (error) {
    console.log(error.message);
  }
});

// to save the created post in database
const createPost = asyncHandler(async (req, res) => {
  try {

    const userInfo = JSON.parse(req.body.userInfo)
    const userId = userInfo._id;
    if (req.file) {
      const post = await Post.create({
        userId: userId,
        post: req.file.filename
      })
        .catch(err => {
          console.log(err.message);
        })
      res.status(200).json({ post: req.file.filename })
    }
  } catch (err) {
    console.log(err);
  }
})

// to show all the posts in home page
const listPost = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId")                     //to retrieve the user name and details 

    // const comments = await Comment.find()     //to retrieve the user and post details 
    //   .populate("userId", "postId")

    res.status(200).json(posts)
  } catch (err) {
    console.log(err);
  }
})

const comment = asyncHandler(async (req, res) => {
  try {
    console.log('entered');
    const userInfo = req.body.userInfo
    const userId = userInfo._id
    const comment = await Comment.create({
      userId: userId,
      comment: req.body.comment,
      postId: req.body.postId
    })
    res.status(200).json(comment)
  } catch (err) {
    console.log(err);
  }
})

// to get the user profile for showing profile details
const profile = asyncHandler(async (req, res) => {
  console.log("jjjj",userInfo);
  const email = req.body.email
  const user = await User.findOne({ email: email })
})

export {
  authUser,
  registerUser,
  logoutUser,
  // getUserProfile,
  // updateUserProfile,
  updateUserImage,
  checkOtp,
  createPost,
  listPost,
  comment,
  profile,
};
