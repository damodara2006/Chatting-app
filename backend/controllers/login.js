import { LoginSchema } from "../models/Login.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorApi from "../utils/ErrorApi.js";
import bcrypt from "bcrypt";

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await LoginSchema.findOne({ email: email });

  if (!user) {
    return res.send("No user found");
  }

  const userpass = user.password;

  if (await bcrypt.compare(password, userpass)) {
   return  res.send("Loggedin");
  } else {
   return  res.send("Password incorrect");
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

export { newuser, login };
