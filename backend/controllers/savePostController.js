import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";



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

export {
    savePost,
    getSavedPost,

};