import express from "express";
import Router from "express";
import { login, newuser, logout } from "../controllers/login.js";
import check from "../controllers/check.js";
import {profilepic ,  upload , uploadOnCloud} from "../controllers/cloudinary.js"
import changedata from "../controllers/changedata.js";
import checks from "../controllers/cookiecheck.js";
import { message } from "../controllers/message.js";
import { messages, user, usermsg } from "../controllers/Getmessage.js";
import { userprofile } from "../controllers/profile.js";

const router = express.Router();

router.route("/login").post( upload.any(),login);
router.route("/newuser").post( upload.any() ,newuser);
router.route("/logout").post( upload.any(),logout);
router.route("/check").get(check);
router.route("/checks").get(checks);
router.route("/profilepic" ).post( upload.any() , check ,profilepic , uploadOnCloud , changedata  );
router.route("/newmessage").post(upload.any(), check,  message)
router.route("/messages").post(upload.any(), check, messages)
router.route("/users").post(upload.any(), check, user)
router.route("/usermsg/:id/:recevierid").post(upload.any(), check, usermsg)
router.route("/userprofile").post(userprofile)


    
export default router;
