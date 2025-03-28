import express from "express"
import multer from "multer"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
const upload = multer();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


export default app;