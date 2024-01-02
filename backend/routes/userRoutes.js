import express from "express";
import {
  authUser,
  registerUser,
  resendOtp,
  logoutUser,
  checkOtp,
  checkUserBlocked,

} from "../controllers/userController.js";
import { getFullProfile, userProfile, profile, updateUserProfile, removeFollower, removeFollowing, deletePost } from "../controllers/profileController.js";
import { getNotification, deleteNotification, getNumbers } from "../controllers/notificationController.js";
import { getMessage, sendMessage, accessChat, fetchChats } from "../controllers/messageController.js";
import { createPost, likePost, listPost, comment, reportComment, reportPost, deleteComment, editCaption, follow, search, unfollow, suggestions } from "../controllers/homeController.js";
import { savePost, getSavedPost } from "../controllers/savePostController.js";
import { request, getRequest } from "../controllers/requestController.js";
import { auth } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";



const router = express.Router();

router.post("/", registerUser);

router.post("/resendOtp", resendOtp)

router.post("/checkOtp", checkOtp);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

router.post("/post", auth, upload.single("filed"), createPost)

router.get("/listPost", auth, listPost)

router.post("/comment", auth, comment)

router.get("/profile", auth, profile)

router.post("/updateProfile", upload.single("filed"), updateUserProfile);

router.post("/savePost", auth, savePost)

router.get("/savedPost", auth, getSavedPost)

router.post("/likePost", auth, likePost)

router.post("/reportPost", auth, reportPost)

router.get("/checkUserBlocked", checkUserBlocked)

router.get("/getFullProfile", auth, getFullProfile)

router.post("/follow", auth, follow)

// router.post("/follower", auth, follower)
router.post("/unfollow", auth, unfollow)

router.post(`/userProfile`, auth, userProfile)

router.post(`/reportComment`, auth, reportComment)

router.get('/getNotification', auth, getNotification)

router.delete('/deleteComment', auth, deleteComment)

router.delete('/deletePost', auth, deletePost)

router.patch('/editCaption', auth, editCaption)

router.delete('/removeFollower', auth, removeFollower)

router.delete('/removeFollowing', auth, removeFollowing)

router.post('/search', auth, search)

router.post('/getMessage', auth, getMessage)

router.post('/sendMessage', auth, sendMessage)

router.post('/request', auth, request)

router.get('/getRequest', auth, getRequest)

router.get('/suggestions',auth, suggestions)

router.post('/accessChat',auth, accessChat)

router.get('/fetchChat',auth, fetchChats)

router.post('/deleteNotification',auth, deleteNotification)

router.get('/getNumbers',auth, getNumbers)



export default router;
