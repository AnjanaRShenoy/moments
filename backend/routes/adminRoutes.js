import express from "express";
import {
    authAdmin,
    listUsers,
    searchUsers,
    blockUser,
    deletePost,
    getPost,
    getComment,
    deleteComment,
} from "../controllers/adminController.js";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";

router.post("/auth", authAdmin);

router.get("/listUsers", listUsers);

router.post("/search-users", searchUsers);

router.post("/blockUser", blockUser);

router.post("/deletePost", deletePost)

router.get("/getPost", getPost)

router.get("/getComment", getComment)

router.delete("/deleteComment", deleteComment)


export default router;