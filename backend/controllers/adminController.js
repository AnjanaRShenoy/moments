import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

//admin to login
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });      //checks if user exists
  if (user && (await user.matchPassword(password))) {     //checks if passwords match
    if (user.isAdmin == 1) {                              //checks if isAdmin is true
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      });
    }
    else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const listUsers = asyncHandler(async (req, res) => {
  try {

    const users = await User.find({ isAdmin: false });

    res.status(201).json(users);
  } catch (error) {
    console.log(error.message);
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.body.search, $options: "i" },
      isAdmin: false,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  try {

    const userId = req.body.userId
    const status = req.body.status
    if (status === "block") {
      const active = await User.findByIdAndUpdate(
        userId,
        { isBlocked: true })
    } else {
      const active = await User.findByIdAndUpdate(
        userId,
        { isBlocked: false })
    }
    res.status(200).json({ message: `${userId.name} has been blocked` })
  } catch (error) {
    console.log(error.message);
    res
      .status(200)
      .json({ message: "User Profile Delete Failed", task: false });
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ message: "hello world" });
  } catch (error) {
    console.log(error.message);
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ _id: req.body.user })
    res.status(200).json({ user })
  } catch (error) {
    console.log(error.message)
  }
})

const getPost = asyncHandler(async (req, res) => {
  try {

    const post = await Post.aggregate([
      {
        $match: {
          report: { $exists: true },
          $expr: { $gte: [{ $size: "$report" }, 5] }
        }
      },{
        $lookup:{
          from:"users",
          localField:"userId",
          foreignField:'_id',
          as:"userData"
        }
      }

    ])
    // console.log(post.userData
    //   , "llllllllllll");

    res.status(200).json(post)
  } catch (err) {
    console.log(err);
  }
})

const deletePost = asyncHandler(async (req, res) => {
  try {

    await Post.findByIdAndDelete({ _id: req.body.postId });
    res
      .status(200)
      .json({ message: "User Profile Deleted Successfully", task: true });
  } catch (err) {
    console.log(err);
  }
})



export {
  authAdmin,
  listUsers,
  searchUsers,
  blockUser,
  editUser,
  getUser,
  deletePost,
  getPost
};

