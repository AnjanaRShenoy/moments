import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        caption: {
            type: String
        },
        post: {
            type: String,
            required:true
        },
        like:[{
            userId:{
            type:mongoose.Schema.Types.ObjectId,
            }
        }],
        report:[],

        createdAt: {
            type: Date,
            default:Date.now(),
            required: true
        },
    }
);


const Post = mongoose.model("Post", postSchema);

export default Post;
