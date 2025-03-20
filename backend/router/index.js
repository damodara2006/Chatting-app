import express from "express"
import Router from "express"
import  {login , newuser ,logout}  from "../controllers/login.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/newuser").post(newuser)
router.route("/logout").get(logout)

export default router;