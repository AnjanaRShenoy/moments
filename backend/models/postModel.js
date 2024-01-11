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
<<<<<<< HEAD
            default: "",
=======
            default:""
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
        },
        post: {
            type: String,
            required: true
        },
<<<<<<< HEAD
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
=======
        like:[{
            userId:{
            type:mongoose.Schema.Types.ObjectId,
            }
        }],
        report:[],

>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
    }
);


const Post = mongoose.model("Post", postSchema);

export default Post;
