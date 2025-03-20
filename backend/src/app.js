import express from "express"
import multer from "multer"
import cookieParser from "cookie-parser";
const app = express();
const upload = multer();
app.use(cookieParser())
app.use(upload.any());
app.use(express.json());



export default app;