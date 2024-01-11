import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js"
import Chat from "../models/chatModel.js";
import mongoose from "mongoose";
const getMessage = asyncHandler(async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.body.profileId })
            .select("name profileImage")
        const currentuser = req.body.userInfo._id
        const touser = req.body.profileId
        const message = await Message.find({
            $and: [
                {
                    $or: [
                        { senderId: currentuser },
                        { receiverId: currentuser }
                    ]
                },
                {
                    $or: [
                        { senderId: touser },
                        { receiverId: touser }
                    ]
                }
            ]
        }).populate("senderId")

        const read = await Message.updateMany({ senderId: touser, receiverId: currentuser }, { isRead: true })
        // const unreadMessages= await Message.find({receiverId: currentuser,isRead:false})
        // const unReadCount= unreadMessages.length
        
        // const userId = new mongoose.Types.ObjectId(touser);
        // const currentId = new mongoose.Types.ObjectId(currentuser);
        // const unReadCount = await Chat.findOneAndUpdate({ users: [userId, currentId] })
        

        const uniqueSenderIds = await Message.distinct('senderId', {
            $or: [
                { senderId: { $ne: currentuser }, receiverId: currentuser },
                { senderId: currentuser, receiverId: { $ne: currentuser } }
            ]
        });

        const uniqueSenders = await User.find({ _id: { $in: uniqueSenderIds } }).select("name profileImage");


        res.status(200).json({ user, message, uniqueSenders })
    } catch (err) {
        console.log(err);
    }
})


const sendMessage = asyncHandler(async (req, res) => {
    try {
        const chatExist = await Chat.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.body.userId } } },
                { users: { $elemMatch: { $eq: req.body.userInfo._id } } }
            ]
        })
        if (!chatExist) {
            var chatData = {
                users: [req.body.userId, req.body.userInfo._id],
            }
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
        }
        const message = await Message.create({
            senderId: req.body.userInfo._id,
            receiverId: req.body.userId,
            message: req.body.message
        })
        req.app.get('io').in(req.body.userInfo._id).emit("get message")
        req.app.get('io').in(req.body.userInfo._id).emit("get messageCount")

        res.status(200).json(message)
    } catch (err) {
        console.log(err);
    }
})

const accessChat = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body
        var isChat = await Chat.find({
            $and: [
                { users: { $elemMatch: { $er: req.user._id } } },
                { users: { $elemMatch: { $er: userId } } }
            ]
        }).populate("users", "-password")
            .populate("latestMessage")

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: "name profileImage email"
        })
        if (isChat.length > 0) {
            res.send(isChat[0])

        } else {
            var chatData = {
                chatName: "sender",
                users: [req.user._id, userId],
            }
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
            res.status(200).json(fullChat)
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        const chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name profileImage email"
                })
            })
    } catch (err) {
        console.log(err);
    }
})
export { getMessage, sendMessage, accessChat, fetchChats }