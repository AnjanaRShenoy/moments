import asyncHandler from "express-async-handler";
import Request from "../models/RequestModel.js";
import mongoose from "mongoose";


const request = asyncHandler(async (req, res) => {
    try {
      const requestExist = await Request.findOne({
        sender: req.body.userInfo._id,
        receiver: req.body.userId,
      })
     
      if (!requestExist) {
        const request = await Request.create({
          sender: req.body.userInfo._id,
          receiver: req.body.userId,
        })
      } else {
        const request = await Request.findOneAndDelete({
          sender: req.body.userInfo._id,
          receiver: req.body.userId,
        })
      }
      req.app.get('io').in(req.body.userId).emit("get request","reqiested")
      res.status(200).json(request)
    } catch (err) {
      console.log(err);
    }
  })
  
  const getRequest = asyncHandler(async (req, res) => {
    try {
  
      const strinId = req.query._id;
      const userInfo = new mongoose.Types.ObjectId(strinId);
      const request = await Request.find({ receiver: userInfo })
        .populate("sender")
        .sort({ _id: -1 })
      res.status(200).json(request)
    } catch (err) {
      console.log(err);
    }
  })

  export{ 
    getRequest,
    request
  }