import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Follow from "../models/followModel.js"
import Notification from "../models/notificationModel.js";
import mongoose from "mongoose";


const getFullProfile = asyncHandler(async (req, res) => {
    try {

        const user = await User.find({ _id: req.query._id })
        const post = await Post.find({ userId: req.query._id })
            .sort({ _id: -1 })
        const postCount = post.length

        const followCount = await Follow.findOne({ userId: req.query._id })
        const followers = followCount.follower.length
        const followings = followCount.following.length
        const followList = await Follow.findOne({ userId: req.query._id })

        const stringId = req.query._id;
        const objectId = new mongoose.Types.ObjectId(stringId);
        const follow = await Follow.aggregate([
            {
                $match: {
                    userId: objectId
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "follower",
                    foreignField: '_id',
                    as: "followerData"
                }
            }
            , {
                $lookup: {
                    from: "users",
                    localField: "following",
                    foreignField: '_id',
                    as: "followingData"
                }
            }
        ])


        const comments = await Comment.find()     //to retrieve the user and post details 
            .populate("userId")
            .sort({ _id: -1 })

        res.status(200).json({ user: user, post: post, postCount, followers, followings, comments, followList, follow })
    } catch (err) {
        console.log(err);
    }
})

const userProfile = asyncHandler(async (req, res) => {
    try {

        const stringId = req.body.profileId;
        const profileId = new mongoose.Types.ObjectId(stringId);

        const followExist = await Follow.findOne({
            userId: req.body.userInfo._id,
            'following': profileId
        })

        if (followExist) {
            const user = await User.find({ _id: req.body.profileId })
            const post = await Post.find({ userId: req.body.profileId })
            const postCount = post.length
            const followCount = await Follow.findOne({ userId: req.body.profileId })
            const followers = followCount.follower.length
            const followings = followCount.following.length

            res.status(200).json({ user: user, post: post, postCount, followCount, followers, followings })

        } else {
            const user = await User.find({ _id: req.body.profileId })
            const post = await Post.find({ userId: req.body.profileId })
            const postCount = post.length
            const followCount = await Follow.findOne({ userId: req.body.profileId })
            const followers = followCount.follower.length
            const followings = followCount.following.length

            res.status(200).json({ user: user, postCount, followCount, followers, followings })
        }

    } catch (err) {
        console.log(err);
    }
})
const profile = asyncHandler(async (req, res) => {
    try {
  
      const { _id } = req.query;
  
      const user = await User.findById(_id)
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
    }
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

  const removeFollower = asyncHandler(async (req, res) => {
    try {
  
      const follow = await Follow.findOneAndUpdate({ userId: req.body.userInfo._id },
        { $pull: { follower: req.body.userId } },
        { new: true })
      const follower = await Follow.findOneAndUpdate({ userId: req.body.userId },
        { $pull: { following: req.body.userInfo._id } },
        { new: true })
      const notification = await Notification.findOneAndDelete({
        type: "follow",
        sender: req.body.userId,
        receiver: req.body.userInfo._id,
      })
  
      res.status(200).json(follow)
    } catch (err) {
      console.log(err);
    }
  })
  
  const removeFollowing = asyncHandler(async (req, res) => {
    try {
  
      const follow = await Follow.findOneAndUpdate({ userId: req.body.userInfo._id },
        { $pull: { following: req.body.userId } },
        { new: true })
      const follower = await Follow.findOneAndUpdate({ userId: req.body.userId },
        { $pull: { follower: req.body.userInfo._id } },
        { new: true })
      const notification = await Notification.findOneAndDelete({
        type: "follow",
        sender: req.body.userId,
        receiver: req.body.userInfo._id,
      })
      res.status(200).json(follow)
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
    getFullProfile,
    userProfile,
    profile,
    updateUserProfile,
    removeFollower,
    removeFollowing,
    deletePost,
};
