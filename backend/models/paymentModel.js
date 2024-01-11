import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
    }
);


const Post = mongoose.model("Post", postSchema);

export default Post;
