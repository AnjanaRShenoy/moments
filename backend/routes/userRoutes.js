import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  // getUserProfile,
  // updateUserProfile,
  updateUserImage,
  checkOtp,
  createPost,
  listPost,
  comment,
  profile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/", registerUser);

router.post("/checkOtp", checkOtp);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

router.post("/post", upload.single("filed"), createPost)

router.get("/listPost", listPost)

router.post("/comment", comment)

router.get("/profile", profile)

// router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

router.put("/profile-updateImage", upload.single("image"), protect, updateUserImage);

export default router;
