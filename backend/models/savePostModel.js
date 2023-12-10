import mongoose from "mongoose";

const savePostSchema = mongoose.Schema(
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


const SavePost = mongoose.model("SavePost", savePostSchema);

export default SavePost;
