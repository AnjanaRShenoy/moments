import mongoose from "mongoose";

const followSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        following: [],

        follower: [],


    }
);


const Follow = mongoose.model("Follow", followSchema);

export default Follow;
