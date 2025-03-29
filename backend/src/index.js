import {app,server} from "./app.js";
import router from "../router/index.js";
import MONGODB from "../mongodb/index.js";
import AsyncHandler from "../utils/AsyncHandler.js";
app.use("/", router);


  await MONGODB()


  
server.listen(8080, () => {
  console.log("Running at :8080");
});
