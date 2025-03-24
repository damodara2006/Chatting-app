import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Chat() {
  const location = useLocation();

  const [data,setdata] = useState([])
  let userid = location.state.user
  let key = location.state.key
  console.log(userid)
  console.log(key)
  const[message,setmessage] = useState()
  useEffect(()=>{
    axios.post(`http://localhost:8080/usermsg/${userid}/${key}`)
    .then(res=>setdata(res.data))
  })

  const handlesubmit = ()=>{
    axios.post(`http://localhost:8080/newmessage` , {senderid:userid , recevierid:key , text:message})
    setmessage("")
  }
  
  return (
    <div className="w-screen h-screen flex justify-center">

      <div className="w-[40%]    ">
      <ul className="  flex flex-col relative ">
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
      <div className="flex absolute bottom-8 w-96 ">
     <input className="border outline-0 w-80" type="text" value={message} onChange={e=>setmessage(e.target.value)} />
     <button className="ml-5 border px-3" onClick={handlesubmit}>Submit</button>
      </div>
      
    </div>
  );
}

export default Chat;
