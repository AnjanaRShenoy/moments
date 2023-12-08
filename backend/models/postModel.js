import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        caption: {
            type: String,
            default: "",
        },
        post: {
            type: String,
            required: true
        },
        like: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
        report: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
    }
);


const Post = mongoose.model("Post", postSchema);

export default Post;
