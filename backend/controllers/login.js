import { LoginSchema } from "../models/Login.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorApi from "../utils/ErrorApi.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await LoginSchema.findOne({ email: email });


  if (!user) {
    return res.send("No user found");
  }
  const token = await jwt.sign( {user} , "json-web-token" )
  res.cookie( "Logeduser" ,token , {maxAge: 100000 , httpOnly:true})

  const userpass = user.password;



  if (await bcrypt.compare(password, userpass)) {
    return res.send("Loggedin");
  } else {
    return res.send("Password incorrect");
  }
  return res.send(user.password);
});

const newuser = AsyncHandler(async (req, res) => {
  let { email, password, username } = req.body;

  if ([email, password, username].some((item) => item == null)) {
    return res.send("All fields required");
  }

  const user = await LoginSchema.findOne({
    $or: [{ email }, { username }]
  });

  if (user) {
    return res.send("User Already exist");
  }

  if (!user) {
    password = await bcrypt.hash(password, 10);
    const newuser = new LoginSchema({
      email: email,
      password: password,
      username: username
    });
    await newuser.save();
    res.send(newuser);
  }

  return res.send(user);
});

const logout = AsyncHandler(async(req,res)=>{

  const cooks = req.cookies;
  console.log(cooks)
 await res.clearCookie("Logeduser"); 

  const cook = req.cookies;
  console.log(cook)
})
export { newuser, login ,logout};

