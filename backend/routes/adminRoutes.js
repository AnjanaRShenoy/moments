import express from "express";
import { authAdmin, adminListUsers, adminSearchUsers, adminDeleteUser, adminEditUser,adminGetUser } from "../controllers/adminController.js";
const router = express.Router();

router.post("/auth", authAdmin);

router.get("/list-users", adminListUsers);

router.post("/search-users", adminSearchUsers);

router.post("/get-user", adminGetUser);

router.post("/delete-user", adminDeleteUser);

router.post("/edit-user", adminEditUser);

router.get("/getPost",adminAuth, getPost)

export default router;
