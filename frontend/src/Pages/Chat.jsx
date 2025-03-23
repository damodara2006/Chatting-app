import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Chat() {
  const location = useLocation();

  const [data,setdata] = useState([])
  let userid = location.state.user
  let key = location.state.key
  
  useEffect(()=>{
    axios.post(`http://localhost:8080/usermsg/${userid}/${key}`)
    .then(res=>setdata(res.data))
  })
  
  return (
    <div className="w-screen h-screen flex justify-center">
      <ul className=" w-[40%] h-full  flex flex-col relative border">
        { data.length !== 0 ?
            data?.map((item,key)=>{

                const positio = userid == item?.senderid ? "right" : "left"

               return(
                <div key={key} className=" relative h-12">
                <li key={key} className="mt-4 " style={{  position:"absolute", [positio]:10 }}>{item?.message}</li>
                {/* <li key={key} className="mt-10 " style={{  position:"absolute" , [positio]:10 }}>{item.updatedAt}</li> */}
                </div>
               )
}) : ""
            
        }
      </ul>
    </div>
  );
}

export default Chat;
