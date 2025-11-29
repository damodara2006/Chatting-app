import { LoginSchema } from "../models/Login.js";
import { messageSchema } from "../models/message.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const message = AsyncHandler(async (req, res) => {
  const { senderid, recevierid, text, receiveremail } = req.body;

  console.log(text)
  let user;
  if (receiveremail) {
    user = await LoginSchema.findOne({ email: receiveremail });
    if(!user){
      return res.send("No user found")
    }
  }
 

  console.log(text)
  if (text) {
    const newMessage = new messageSchema({
      senderid: senderid,
      receiverid: recevierid || user._id,
      message: text
    });
    await newMessage.save();
    console.log(newMessage);
    res.send(newMessage);
  }
});

export { message };
