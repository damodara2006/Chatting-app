    import { LoginSchema } from "../models/Login.js";
    import AsyncHandler from "../utils/AsyncHandler.js";
    import ErrorApi from "../utils/ErrorApi.js";
    import bcrypt from "bcrypt";
    import cookieParser from "cookie-parser";
    import jwt from "jsonwebtoken";

    const login = AsyncHandler(async (req, res,next) => {
      const { email, password } = req.body;
      const user = await LoginSchema.findOne({ email: email });

      if([email,password].some((i)=>i=="")){
       return res.send('All details required')
      }
      if (!user) {
        return res.send("No user found");
      }
      const token = await jwt.sign( {user} , "json-web-token" );
      res.cookie("Logeduser", token, { maxAge: 1200000 , secure:true , sameSite:'none'});
        

      const userpass = user.password;

      const decoded = jwt.verify(token ,"json-web-token");
      

      if (await bcrypt.compare(password, userpass)) {
        return res.send("Loggedin");
      } else {
        return res.send("Password incorrect");
      }


    });


    const newuser = AsyncHandler(async (req, res) => {
      let { email, password, username } = req.body;

      if([email,password,username].some((i)=>i==null)){
        return res.send('All details required')
       }

      const useremail = await LoginSchema.findOne({
         email 
      });

      const userusername = await LoginSchema.findOne({
        $or: [{ username }]
      });

      if (userusername) {
        return res.send("Username Already exist");
      }
      if (useremail) {
        return res.send("Email Already exist");
      }

      if (!userusername) {
        password = await bcrypt.hash(password, 10);
        const newuser = new LoginSchema({
          email: email,
          password: password,
          username: username,
          profile:'https://res.cloudinary.com/dmbiqpg0z/image/upload/v1742713648/nxz8mqbl9ljkbz8tmsrm.webp'
        });
        await newuser.save();
       return res.status(201).send(newuser.email);
      }

      return res.send(userusername);
    });

    const logout = AsyncHandler(async (req, res) => {
      const cooks = req.cookies;
    await res.clearCookie("Logeduser");
     return res.send("Logged out")
    });



    export { newuser, login, logout };
