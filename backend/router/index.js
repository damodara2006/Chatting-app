import express from "express";
import Router from "express";
import { login, newuser, logout } from "../controllers/login.js";
import check from "../controllers/check.js";
import profilepic from "../controllers/profile.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/newuser").post(newuser);
router.route("/logout").post(logout);
router.route("/check").post(check);
router.route("/profilepic").post(profilepic);

export default router;
