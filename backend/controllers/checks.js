import AsyncHandler from "../utils/AsyncHandler.js";
import cookieParser from "cookie-parser";
import ErrorApi from "../utils/ErrorApi.js";
import jwt from "jsonwebtoken"
const checks = AsyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie.Logeduser) {
        return res.send("Login first"); 
    }
    
    const data = await jwt.verify(cookie.Logeduser , 'json-web-token')
    
    res.send(data)
    
});


export default checks;