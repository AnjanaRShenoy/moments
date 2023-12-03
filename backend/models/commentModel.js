import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        comment: {
            type: String,
            required:true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        createdAt: {
            type: Date,
            default:Date.now(),
            required: true
        },
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
