import express from "express";
import Router from "express";
import { login, newuser, logout } from "../controllers/login.js";
import check from "../controllers/check.js";
import {profilepic ,  upload , uploadOnCloud} from "../controllers/cloudinary.js"
import changedata from "../controllers/changedata.js";
import checks from "../controllers/checks.js";

const router = express.Router();

router.route("/login").post( upload.any(),login);
router.route("/newuser").post( upload.any() ,newuser);
router.route("/logout").post( upload.any(),logout);
router.route("/check").get(check);
router.route("/checks").get(checks);
router.route("/profilepic" ).post( upload.any() , check ,profilepic , uploadOnCloud , changedata  );

export default router;
