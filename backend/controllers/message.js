import { LoginSchema } from "../models/Login.js";
import { messageSchema } from "../models/message.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const message = AsyncHandler(async (req, res) => {
  const { senderid, recevierid, text, receiveremail } = req.body;
  console.log(receiveremail);
  console.log(senderid);
  console.log(text);

  let user;
  if (receiveremail) {
    user = await LoginSchema.findOne({ email: receiveremail });
    console.log(user.toObject());
  }

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
