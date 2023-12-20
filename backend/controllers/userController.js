import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import nodemailer from 'nodemailer';
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Follow from "../models/followModel.js"
import Notification from "../models/notificationModel.js";

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
    console.log(req.body, "oeyye");
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

// to make changes in profile
const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findOne({ _id: req.body._id });

  if (user) {
    user.name = req.body.name || user.name;
    User.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.bio = req.body.bio || user.bio
    if (req.file) {
      user.profileImage = req.file.filename
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phoneNumber: updatedUser.phoneNumber,
      bio: updatedUser.bio,
      profileImage: updatedUser.profileImage
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// to change profile picture
const updateUserImage = asyncHandler(async (req, res) => {
  try {

    if (req.body) {
      User.findByIdAndUpdate(
        { _id: req.body._id },
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
      const postObject = {
        userId: userId,
        post: req.file.filename,
      };


      if (req.body.caption) {
        postObject.caption = req.body.caption;
      }

      const post = await Post.create(postObject);

      res.status(200).json({ post: req.file.filename })
    }
  } catch (err) {
    console.log(err);
  }
})

// to show all the posts in home page
const listPost = asyncHandler(async (req, res) => {
  try {
    const user = req.query._id

    const posts = await Post.find({ userId: { $ne: user } })
      .populate("userId")
      .sort({ _id: -1 })                    //to retrieve the user name and details 


    const comments = await Comment.find()     //to retrieve the user and post details 
      .populate("userId")

    const userData = await User.findOne({ _id: req.query._id })

    const follow = await Follow.findOne({ userId: user })


    res.status(200).json({ posts, comments, userData, follow })
  } catch (err) {
    console.log(err);
  }
})

const comment = asyncHandler(async (req, res) => {
  try {

    const userInfo = req.body.userInfo
    const userId = userInfo._id
    const comment = await Comment.create({
      userId: userId,
      comment: req.body.comment,
      postId: req.body.postId
    })
    const post = await Post.findOne({ _id: req.body.postId })
      .populate("post")

    console.log(post);

    const notification = await Notification.create({
      type: "comment",
      content: "has commented on your post",
      resource: [req.body.postId],
      sender: userInfo._id,
      receiver: post.userId
    })




    res.status(200).json(comment)
  } catch (err) {
    console.log(err);
  }
})

// to get the user profile for showing profile details
const profile = asyncHandler(async (req, res) => {
  try {

    const { _id } = req.query;

    const user = await User.findById(_id)
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }
});


const savePost = asyncHandler(async (req, res) => {
  try {

    const userInfo = req.body.userInfo
    const postId = req.body.postId
    const user = await User.findById(userInfo._id)
    const postExist = user.savedPost.includes(postId);

    if (postExist) {
      const unSave = await User.findOneAndUpdate(
        { _id: userInfo._id },
        { $pull: { savedPost: postId } },
        { new: true })
      res.status(200).json({ message: "Post has been unsaved" })
    } else {
      const savePost = await User.findOneAndUpdate(
        { _id: userInfo._id },
        { $push: { savedPost: postId } },
        { upsert: true, new: true }
      )
      res.status(200).json({ message: "Post has been saved" })
    }
  } catch (err) {
    console.log(err);
  }
})

const getSavedPost = asyncHandler(async (req, res) => {
  try {

    const user = await User.findById({ _id: req.query._id })
    const savedPos = user.savedPost
    var postsDetails = []

    for (var i = 0; i < savedPos.length; i++) {
      const post = await Post.findById({ _id: savedPos[i] })
      postsDetails.push(post);
    }

    res.status(200).json(postsDetails)
  } catch (err) {
    console.log(err);
  }
})

const likePost = asyncHandler(async (req, res) => {
  try {

    const userInfo = req.body.userInfo
    const postId = req.body.postId

    const likeExist = await Post.findOne(
      {
        _id: postId,
        like: { $elemMatch: { userId: userInfo._id } }
      });

    if (likeExist) {
      const unLike = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { like: { userId: userInfo._id } } },
        { new: true })
      const notification = await Notification.findOneAndDelete({
        type: "like",
        sender: userInfo,
        resource: [postId]
      })
      res.status(200).json({ message: "Post has been unliked" })
    } else {
      const likePost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { like: { userId: userInfo._id } } },
        { upsert: true, new: true }
      )
      const post = await Post.findOne({ _id: postId })
        .populate("post")

      const notification = await Notification.create({
        type: "like",
        content: "has liked you post",
        resource: [postId],
        sender: userInfo,
        receiver: post.userId

      })

      res.status(200).json({ message: "Post has been liked" })
    }
  } catch (err) {
    console.log(err);
  }
})

const reportPost = asyncHandler(async (req, res) => {
  try {
    const userInfo = req.body.userInfo
    const postId = req.body.postId
    const posts = await Post.findOne({ _id: postId })
    const alreadyReported = posts.report.includes(userInfo._id)
    if (alreadyReported) {
      res.status(200).json({ message: "You have reported the post" })
    } else {
      const post = await Post.findByIdAndUpdate(
        { _id: postId },
        { $push: { report: [userInfo._id] } },
        { upsert: true, new: true }
      );

      res.status(200).json({ message: "You have reported the post" })
    }

  } catch (err) {
    console.log(err);
  }
})

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

const getFullProfile = asyncHandler(async (req, res) => {
  try {

    const user = await User.find({ _id: req.query._id })
    const post = await Post.find({ userId: req.query._id })
      .sort({ _id: -1 })
    const postCount = post.length

    const followCount = await Follow.findOne({ userId: req.query._id })
    const followers = followCount.follower.length
    const followings = followCount.following.length
    const comments = await Comment.find()     //to retrieve the user and post details 
      .populate("userId")
      .sort({ _id: -1 })

    res.status(200).json({ user: user, post: post, postCount, followers, followings, comments })
  } catch (err) {
    console.log(err);
  }
})

const follow = asyncHandler(async (req, res) => {
  try {
    const user = req.body.userId

    const userInfo = req.body.userInfo._id

    const userExist = await Follow.findOne({ userId: userInfo })
    if (!userExist) {
      const createUser = await Follow.create({ userId: userInfo })
    }

    const followerExist = await Follow.findOne({ userId: user._id })
    if (!followerExist) {
      const createFollower = await Follow.create({ userId: user._id })
    }

    const follow = await Follow.findOne({
      userId: userInfo,
      following: { $in: user._id }
    });

    if (follow) {
      const unfollow = await Follow.findOneAndUpdate(
        { userId: userInfo },
        { $pull: { following: user._id } },
        { new: true })
      const unfollower = await Follow.findOneAndUpdate(
        { userId: user._id },
        { $pull: { follower: userInfo } },
        { new: true })
      const notification = await Notification.findOneAndDelete({
        type: "follow",
        sender: userInfo,
        receiver: user._id,
      })
      res.status(200).json({ message: "Unfollowed successfully" })
    } else {

      const follow = await Follow.findOneAndUpdate(
        { userId: userInfo },
        { $push: { following: user._id } },
        { new: true })
      const follower = await Follow.findOneAndUpdate(
        { userId: user._id },
        { $push: { follower: userInfo } },
        { new: true }
      )
      const notification = await Notification.create({
        type: "follow",
        content: " has started following you",
        // resource:[user._id],
        sender: userInfo,
        receiver: user._id
      })
      res.status(200).json({ message: "Followed successfully" })
    }

  } catch (err) {
    console.log(err);
  }
})

const userProfile = asyncHandler(async (req, res) => {
  try {

    const user = await User.find({ _id: req.query._id })
    const post = await Post.find({ userId: req.query._id })
    const postCount = post.length

    const followCount = await Follow.findOne({ userId: req.query._id })
    const followers = followCount.follower.length
    const followings = followCount.following.length

    res.status(200).json({ user: user, post: post, postCount, followers, followings })
  } catch (err) {
    console.log(err);
  }
})

const reportComment = asyncHandler(async (req, res) => {
  try {

    const { commentId, userInfo } = req.body

    const comment = await Comment.findOne({ _id: commentId })
    const alreadyReported = comment.report.includes(userInfo._id)
    if (alreadyReported) {
      res.status(200).json({ message: "You have reported the post" })
    } else {
      const comment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $push: { report: userInfo._id } },
        { upsert: true, new: true }
      );

      res.status(200).json({ message: "You have reported the post" })
    }
  }
  // await comment.save()
  catch (err) {
    console.log(err);
  }
})

const getNotification = asyncHandler(async (req, res) => {
  try {
    console.log(req.query, "req.query");
    const notification = await Notification.find({ receiver: req.query._id })
      .populate("sender")
      .sort({ _id: -1 })

    res.status(200).json(notification)
  } catch (err) {
    console.log(err);
  }
})

const editComment = asyncHandler(async (req, res) => {
  try {
    console.log(req.body, "req.query");
  } catch (err) {
    console.log(err);
  }
})

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete({ _id: req.body.commentId })
    console.log(comment);
    res.status(200).json("Comment has been deleted")
  } catch (err) {
    console.log(err);
  }
})

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: req.body.postId })
    res.status(200).json(post)
  } catch (err) {
    console.log(err);
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  resendOtp,
  updateUserProfile,
  updateUserImage,
  checkOtp,
  createPost,
  listPost,
  comment,
  profile,
  savePost,
  getSavedPost,
  likePost,
  reportPost,
  checkUserBlocked,
  getFullProfile,
  follow,
  userProfile,
  reportComment,
  getNotification,
  editComment,
  deleteComment,
  deletePost,
};
