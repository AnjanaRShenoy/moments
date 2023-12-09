import express from "express";
import {
  authUser,
  registerUser,
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
  reportPost
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/", registerUser);

router.post("/checkOtp", checkOtp);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

router.post("/post",auth, upload.single("filed"), createPost)

router.get("/listPost", auth, listPost)

router.post("/comment",auth, comment)

router.get("/profile", auth, profile)

router.put("/updateProfile",auth, updateUserProfile);

router.put("/profile-updateImage",auth, upload.single("image"), updateUserImage);

router.post("/savePost",auth, savePost)

router.get("/savedPost", auth, getSavedPost)

router.post("/likePost", auth,likePost)

router.post("/reportPost",auth, reportPost)

export default router;
