import express from "express";
import {
    authAdmin,
    listUsers,
    searchUsers,
    blockUser,
    editUser,
    getUser,
    deletePost,
    getPost,
} from "../controllers/adminController.js";
const router = express.Router();
import { adminAuth } from "../middleware/adminAuthMiddleware.js";

router.post("/auth", authAdmin);

router.get("/listUsers",adminAuth, listUsers);

router.post("/search-users",adminAuth, searchUsers);

router.post("/get-user",adminAuth, getUser);

router.post("/blockUser",adminAuth, blockUser);

router.post("/edit-user",adminAuth, editUser);

router.post("/deletePost",adminAuth, deletePost)

router.get("/getPost",adminAuth, getPost)

export default router;