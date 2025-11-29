import {app,server ,io} from "./app.js";
import router from "../router/index.js";
import MONGODB from "../mongodb/index.js";
import AsyncHandler from "../utils/AsyncHandler.js";
app.use("/", router);


  await MONGODB()

  let connectedUsers = [];
  io.on("connection" , (socket) => {

    const userid = socket.handshake.query.userId;
    connectedUsers.push(userid)
    // console.log(Object.keys(connectedUsers))

    let uniqueuser =[...new Set(connectedUsers)]
    io.emit("getloggedUsers",uniqueuser )

    socket.on("disconnect",()=>{
      connectedUsers = connectedUsers.filter((item) => item !== userid)
    io.emit("getloggedUsers",connectedUsers )

    })
  });

server.listen(8083, () => {
  console.log("Running at :8080");
});
