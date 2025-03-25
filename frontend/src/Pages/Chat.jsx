import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RiSendPlaneFill } from "react-icons/ri";
function Chat() {
  const location = useLocation();

  const [data, setdata] = useState([]);
  let userid = location.state.user;
  let key = location.state.key;
  const [message, setmessage] = useState();

  useEffect(() => {
    axios
      .post(`http://localhost:8080/usermsg/${userid}/${key}`)
      .then((res) => setdata(res.data));
  });

  const handlesubmit = () => {
    axios.post(`http://localhost:8080/newmessage`, {
      senderid: userid,
      recevierid: key,
      text: message
    });
    setmessage("");
  };


  return (
    <div className="w-screen h-screen">
       <div className="flex justify-center h-[90%] overflow-y-auto  scroll-smooth  ">
      <div className="w-[40%] h-[80%]  ">
        <ul className="  flex flex-col relative   ">
          {data?.length > 0
            ? data?.map((item, key) => {
                const positio = userid == item?.senderid ? "right" : "left";
                if (positio == "right") {
                  return (
                    <div key={key} className=" relative h-12 mt-10">
                      <li
                        key={key}
                        className="mt-10  border px-5 py-2 rounded-br-4xl max-w-96 min-w-0 rounded-sm bg-green-500 "
                        style={{ position: "absolute", [positio]: 10 }}
                      >
                        {item?.message}

                        <p>
                          {item?.createdAt
                            ? Intl.DateTimeFormat("en-IN", {
                                timeZone: "Asia/Kolkata", // Convert to IST
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit", // To include milliseconds
                                hour12: true
                              }).format(new Date(item.createdAt)) // Ensure it's a valid Date object
                            : "Invalid date"}
                        </p>
                      </li>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className=" relative h-12 mt-10">
                      <li
                        key={key}
                        className="mt-10 border rounded-bl-4xl py-2 max-w-96 min-w-0-sm rounded-sm px-5 bg-gray-200  "
                        style={{ position: "absolute", [positio]: 10 }}
                      >
                        {item?.message}
                        <p className="">
                          {item?.createdAt
                            ? Intl.DateTimeFormat("en-IN", {
                                timeZone: "Asia/Kolkata", // Convert to IST
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit", // To include milliseconds
                                hour12: true
                              }).format(new Date(item.createdAt)) // Ensure it's a valid Date object
                            : "Invalid date"}
                        </p>
                      </li>
                    </div>
                  );
                }
              })
            : ""}
        </ul>
      </div>
     
    </div>
    <footer className="flex bottom-0 justify-center">
    <div className="flex  w-96  ">
     <input
       className="border outline-0 w-96 rounded-lg pl-2.5"
       type="text"
       placeholder="Enter message"
       value={message}
       onChange={(e) => setmessage(e.target.value)}
     />
     <div className="bottom-0 relative">
     <button className="ml-5 px-3 text-5xl" onClick={handlesubmit}>
       <RiSendPlaneFill />
     </button>
     </div>
    
   </div>
    </footer>
    </div>

   
  );
}

export default Chat;
