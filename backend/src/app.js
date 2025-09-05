  import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { Socket } from "dgram";
const app = express();
const upload = multer();
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://chatting-app-pm8f.onrender.com"],
    credentials: true
  }
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatting-app-pm8f.onrender.com"],
    credentials: true
  })
);



export { app, server , io };
