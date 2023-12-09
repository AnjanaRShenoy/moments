import mongoose from "mongoose";

const LikePostSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
       
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:true
        },
        createdAt: {
            type: Date,
            default:Date.now(),
            required: true
        },
    }
);

const LikePost = mongoose.model("LikePost", LikePostSchema);

export default LikePost;
