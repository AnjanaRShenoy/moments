import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";
import Request from "../models/RequestModel.js";
import Message from "../models/messageModel.js";

const getNotification = asyncHandler(async (req, res) => {
  try {

    const notification = await Notification.find({ receiver: req.query._id })
      .populate("sender")
      .sort({ _id: -1 })

    res.status(200).json(notification)
  } catch (err) {
    console.log(err);
  }
})

const deleteNotification = asyncHandler(async (req, res) => {
  try {

    const notification = await Notification.deleteMany({ receiver: req.query._id })
    req.app.get('io').in(req.query._id).emit("get notification")
    res.status(200).json("deleted all")
  } catch (err) {
    console.log(err);
  }
})

const getNumbers = asyncHandler(async (req, res) => {
  try {
   
    const numbers = await Notification.find({ receiver: req.query._id })
    const length = numbers.length

    const requestNumbers = await Request.find({ receiver: req.query._id })
    const requestLength = requestNumbers.length

    const unreadMessages = await Message.find({ receiverId: req.query._id, isRead: false })
    const unReadCount = unreadMessages.length

    res.status(200).json({ length, requestLength, unReadCount })
  } catch (err) {
    console.log(err);
  }
})

export {
  getNotification,
  deleteNotification,
  getNumbers
}