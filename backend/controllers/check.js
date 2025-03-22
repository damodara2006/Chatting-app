import AsyncHandler from "../utils/AsyncHandler.js";
import cookieParser from "cookie-parser";
import ErrorApi from "../utils/ErrorApi.js";
import jwt from "jsonwebtoken"
const check = AsyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie.Logeduser) {
        return res.status(401).send("Login first"); // Stop execution and send response
    }
    
    const data = await jwt.verify(cookie.Logeduser , 'json-web-token')
    
    req.email = data.user.email
    next(); // Proceed to the next middleware/controller
});


export default check;