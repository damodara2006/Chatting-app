import express from "express"
import Router from "express"
import  {login , newuser}  from "../controllers/login.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/newuser").post(newuser)

export default router;