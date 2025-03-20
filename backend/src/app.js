import express from "express"
import multer from "multer"
const app = express();
const upload = multer();

app.use(upload.any());
app.use(express.json());



export default app;