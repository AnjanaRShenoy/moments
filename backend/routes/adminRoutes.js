import express from "express";
import {
    authAdmin,
    listUsers,
    searchUsers,
    blockUser,
    editUser,
    getUser,
    deletePost,
    getPost
} from "../controllers/adminController.js";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";

router.post("/auth", authAdmin);

router.get("/listUsers", listUsers);

router.post("/search-users", searchUsers);

router.post("/get-user", getUser);

router.post("/blockUser", blockUser);

router.post("/edit-user", editUser);

router.post("/deletePost", deletePost)

router.get("/getPost", getPost)


export default router;
