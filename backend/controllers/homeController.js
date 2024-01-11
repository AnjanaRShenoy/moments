import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Follow from "../models/followModel.js"
import Notification from "../models/notificationModel.js";
import Request from "../models/RequestModel.js";


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
        const followers = await Follow.findOne({ userId: user })
        const foll = followers.following

        const posts = await Post.find({ userId: { $in: foll } })
            .populate("userId")
            .sort({ _id: -1 })                    //to retrieve the user name and details 


        const comments = await Comment.find()     //to retrieve the user and post details 
            .populate("userId")

        const userData = await User.findOne({ _id: req.query._id })

        const follow = await Follow.findOne({ userId: user })

        const otherPosts = await Post.find({ userId: { $nin: [user, ...foll] } })
            .populate("userId")
            .sort({ _id: -1 })
        const request = await Request.find({ sender: user })
        res.status(200).json({ posts, comments, userData, follow, otherPosts, request })
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

        const notification = await Notification.create({
            type: "comment",
            content: "has commented on your post",
            resource: [req.body.postId],
            sender: userInfo._id,
            receiver: post.userId
        })
       
        req.app.get('io').in(req.body.userid).emit("get notification")
        
        res.status(200).json(comment)

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
         
            req.app.get('io').in(req.body.userid).emit("get notification", notification)
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
            req.app.get('io').in(req.body.userid).emit("get notification", notification)
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

const follow = asyncHandler(async (req, res) => {
    try {
        if (req.body.response === "accept") {

            const user = req.body.userId

            const userInfo = req.body.userInfo._id

            const userExist = await Follow.findOne({ userId: userInfo })
            if (!userExist) {
                const createUser = await Follow.create({ userId: userInfo })
            }

            const followerExist = await Follow.findOne({ userId: user })
            if (!followerExist) {
                const createFollower = await Follow.create({ userId: user })
            }

            const follow = await Follow.findOne({
                userId: userInfo,
                follower: { $in: user }
            });

            if (follow) {
                const unfollow = await Follow.findOneAndUpdate(
                    { userId: userInfo },
                    { $pull: { follower: user } },
                    { new: true })
                const unfollower = await Follow.findOneAndUpdate(
                    { userId: user },
                    { $pull: { following: userInfo } },
                    { new: true })

                const notification = await Notification.findOneAndDelete({
                    type: "follow",
                    sender: user,
                    receiver: userInfo,
                })
                
                res.status(200).json({ message: "Unfollowed successfully" })
            } else {

                const follow = await Follow.findOneAndUpdate(
                    { userId: userInfo },
                    { $push: { follower: user } },
                    { new: true })
                const follower = await Follow.findOneAndUpdate(
                    { userId: user },
                    { $push: { following: userInfo } },
                    { new: true }
                )
                const notification = await Notification.create({
                    type: "follow",
                    content: " has accepted your request",
                    // resource:[user._id],
                    sender: userInfo,
                    receiver: user
                })

                const followRequest = await Request.findOneAndDelete({ sender: user, receiver: userInfo })
                req.app.get('io').in(userInfo).emit("get request")
                res.status(200).json({ message: "Followed successfully" })
            }
        } else {
            const user = req.body.userId
            const userInfo = req.body.userInfo._id

            const followRequest = await Request.findOneAndDelete({ sender: user, receiver: userInfo })
            req.app.get('io').in(userInfo).emit("get request")
            res.status(200).json({ message: "declined " })
        }

    } catch (err) {
        console.log(err);
    }
})

const unfollow = asyncHandler(async (req, res) => {
    try {


        const user = req.body.userId
        const userInfo = req.body.userInfo._id

        const unfollow = await Follow.findOneAndUpdate(
            { userId: userInfo },
            { $pull: { following: user } },
            { new: true })
        const unfollower = await Follow.findOneAndUpdate(
            { userId: user },
            { $pull: { follower: userInfo } },
            { new: true })

        const notification = await Notification.findOneAndDelete({
            type: "follow",
            sender: user,
            receiver: userInfo,
        })
        res.status(200).json({ message: "Unfollowed successfully" })
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


const deleteComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete({ _id: req.body.commentId })
        // const notification = await Notification.findOneAndDelete(
        //   {
        //     resource: { $elemMatch: req.body.commentId }
        //   });

        res.status(200).json("Comment has been deleted")
    } catch (err) {
        console.log(err);
    }
})

const editCaption = asyncHandler(async (req, res) => {
    try {
        const caption = await Post.findByIdAndUpdate({ _id: req.body.postId }, { caption: req.body.caption })
        res.status(200).json(caption)
    } catch (err) {
        console.log(err);
    }
})


const search = asyncHandler(async (req, res) => {
    try {
    console.log(req.query);
        const search = req.query.search
        const searchRegex = new RegExp(search, "i")
        const user = await User.find({ name: { $regex: searchRegex } })
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})

const suggestions = asyncHandler(async (req, res) => {
    try {

        const userInfo = req.query._id
        const mutual = await Follow.findOne({ userId: userInfo })
        const follower = mutual.follower
        const following = mutual.following

        const mutualFollower = await Follow.find({ userId: { $in: following } })

        const qu = []
        for (var i = 0; i < mutualFollower.length; i++) {
            for (var j = 0; j < mutualFollower[i].following.length; j++) {
                const user = await User.findOne({ _id: mutualFollower[i].following[j] })
                qu.push(user)
            }
        }
        res.json(qu);
    } catch (err) {
        console.log(err);
    }
})


export {
    createPost,
    listPost,
    comment,
    likePost,
    reportPost,
    follow,
    reportComment,
    deleteComment,
    editCaption,
    search,
    unfollow,
    suggestions,
};
