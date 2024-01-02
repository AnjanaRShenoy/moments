import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";

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

  const deleteNotification= asyncHandler(async(req,res)=>{
    try{
      console.log(req.query);
      const notification= await Notification.deleteMany({receiver:req.query._id})
      res.status(200).json("deleted all")
    }catch(err){
      console.log(err);
    }
  })

  const getNumbers= asyncHandler(async(req,res)=>{
    try{
      console.log(req.query);
      const numbers= await Notification.find({receiver:req.query_id})
      const length=numbers.length
      res.status(200).json(length)
    }catch(err){
      console.log(err);
    }
  })

  export{
    getNotification,
    deleteNotification,
    getNumbers
  }