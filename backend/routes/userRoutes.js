import express from "express";
import {
  authUser,
  registerUser,
  resendOtp,
  logoutUser,
  // getUserProfile,
  updateUserProfile,
  updateUserImage,
  checkOtp,
  createPost,
  listPost,
  comment,
  profile,
  savePost,
  getSavedPost,
  likePost,
  reportPost,
  checkUserBlocked,
  getFullProfile,
  follow,
  userProfile,
  reportComment,
  getNotification,

} from "../controllers/userController.js";
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

// router.put("/profileUpdateImage",auth, upload.single("filed"), updateUserImage);

router.post("/savePost", auth, savePost)

router.get("/savedPost", auth, getSavedPost)

router.post("/likePost", auth, likePost)

router.post("/reportPost", auth, reportPost)

router.get("/checkUserBlocked", checkUserBlocked)

router.get("/getFullProfile", auth, getFullProfile)

router.post("/follow", auth, follow)

router.get(`/userProfile`, auth, userProfile)

router.post(`/reportComment`, auth, reportComment)

router.get('/getNotification', auth, getNotification)

export default router;
