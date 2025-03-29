import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";
import {io} from "socket.io-client"
function Home() {
  const [data, setdata] = useState();
  const [profile, setprofile] = useState(false);
  const [messageheader, setmessageheader] = useState([]);
  const navigate = useNavigate();
  const [userid, setuserid] = useState();
  const [uniqueArray, setuniqueArray] = useState([]);
  const [user, setuser] = useState([]);
  const [newemail,setnewemail] = useState();
  const [newtext, setnewtext] = useState()
  const [adduser, setadduser] = useState(false)
  const [userpic,setuserpic] = useState([])
  let inp = document.getElementById("in");
  const handlefile = async () => {
    let inp = document.getElementById("in");
    let data = inp.files[0];
    let file = new FormData();
    await file.append("file", data);

    axios.defaults.withCredentials = true;
    axios
      .post("https://chatting-app-backend-37sd.onrender.com/profilepic", file, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        if (typeof res.data.profile == "string") {
          toast.success("Updated", { autoClose: 2000 });
        }
        setdata(res.data);
      });
  };

  // useEffect(()=>{
  //   let file = new FormData()
  //   file?.append( "file", inp?.files)
  //   console.log(inp?.files)
  // })

  useEffect(() => {
    axios
      .get("https://chatting-app-backend-37sd.onrender.com/checks", { withCredentials: true })
      .then((res) => {
        setdata(res.data.user)});
        const socket = io("http://localhost:8080");
        socket.connect()
  },[]);

  const handlelogout = () => {
    axios.defaults.withCredentials = true;
    axios.post("https://chatting-app-backend-37sd.onrender.com/logout");
    toast.success("Logged out", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // useEffect(()=>{
  //   window.location.reload()

  // },[])
  useEffect(() => {
    setuserid(data?._id);
  },[userid,data]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post("https://chatting-app-backend-37sd.onrender.com/messages", { senderid: userid })
      .then((res) => setmessageheader(res.data));
  },[messageheader,userid]);

  // console.log(userid)

  // console.log(messageheader.filter((item) => item));
  let array;

  array = [...new Set(messageheader)];
  array = array.filter((item) => data?._id !== item);

  useEffect(() => {
    if (array.length > 0) {
      axios.defaults.withCredentials = true;
      axios
        .post("https://chatting-app-backend-37sd.onrender.com/users", { array: array })
        .then((res) => setuser(res.data));
    }
  },[user,array]);

  useEffect(()=>{
    if(user.length>0){
      axios
    .post("https://chatting-app-backend-37sd.onrender.com/userprofile", { array: user })
    .then(res=>setuserpic(res.data))
    }
    
  },[user.length])
  

  const handlechat = (key , user) => {
    axios.defaults.withCredentials = true;
    axios
      .post(`https://chatting-app-backend-37sd.onrender.com/usermsg/${userid}/${array[key]}`)
      .then((res) => {
        navigate("/chat", {
          state: { data: res.data, user: userid, key: array[key] , username : user}
        });
      });
  };


const handleadduser = ()=> {
  axios.post("https://chatting-app-backend-37sd.onrender.com/newmessage",{ senderid:userid, receiveremail:newemail , text:newtext})
  .then(res=>{
    if(res.data == 'No user found'){
     return toast.error("No user found" ,{autoClose:1500})
    }
    if(res.data){
      toast.success("Message sent",{autoClose:1500})
    }
  })
}

  return (
    <div className="relative">
      <ToastContainer />
      {data&& adduser ? 
      <div className="mt-17 -mb-16 flex justify-center ">
      <div className="flex flex-col justify-center w-full items-center ">
        <input type="text" className="border h-11 w-96 pl-5 outline-0" placeholder="Enter sender email" value={newemail} onChange={e=>setnewemail(e.target.value)}/> <br />
        <input type="text" className="border h-11 w-96 pl-5 outline-0" placeholder="Start with Hi " value={newtext} onChange={e=>setnewtext(e.target.value)}/> <br />
        <button className="border h-10 w-20 z-50" onClick={handleadduser}>Submit</button>
      </div>
    </div> : ""}
      {data ? (
        <center className="flex justify-evenly max-h-20 fixed border py-3.5 w-full top-0 bg-gradient-to-r from-green-400 to-green-600 ">
          <div className="w-[30%]  font-winky relative flex right-0">
            <h1 className="absolute text-center w-full">{data?.username}</h1>
          </div>
          <img
            src={data?.profile}
            className="active:scale-90 w-[40%]"
            onClick={() => setprofile(!profile)}
            style={{ borderRadius: "100%", width: "30px", height: "30px" }}
            alt=""
          />
          

          <div className="text-3xl">
          <IoMdContacts onClick={()=>setadduser(!adduser)} />
          </div>
          <button
            className="w-[10%] z-50 font-winky border  rounded-lg hover:bg-gradient-to-r from-gray-300 to-gray-500 transition-all duration-400 flex justify-center items-center "
            onClick={handlelogout}
          >
            <p className="">
              <IoIosLogOut />
            </p>
          </button>
        </center>
        
      ) : (
        <>
          <p>Please login</p>
          <button
            className="border px-4 py-2 rounded-md bg-gray-200"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </>
      )}

    

      {data && profile ? (
        <center className=" items-center justify-center mt-10">
          <input type="file" id="in" className="mt-10 " />
          <div className=" w-fit  rounded-[100%] overflow-hidden h-96 flex justify-center  items-center mt-5">
            <img src={data?.profile} className=" h-96 w-96" alt="" />
          </div>

          <button
            onClick={handlefile}
            className="border px-5 py-2 mt-4 rounded-md hover:bg-gray-400 transition-all duration-75 ease-in active:scale-75 "
          >
            Submit
          </button>
        </center>
      ) : (
        ""
      )}
      <div className="flex  w-[100%]   ">
      <div className="flex w-[100%] justify-center items-center ml-[10%]">
      <ul className="mt-18 flex flex-col  justify-center  items-center">
         
         {
           userpic.map((item,key)=>(
             <li>
                <img src={item} key={key} className="w-9 my-3 h-9 rounded-full mr-5" ></img>
             </li>
           ))
            

         }
            
             {/* <img src={userpic[1]} className="w-9" ></img> */}


         </ul>
       <ul className="mt-18 flex flex-col  w-[90%]">
         {user?.map((i, key) => (
           <li
             key={key}
             onClick={() => handlechat(key ,i )}
             className="border rounded-3xl mb-1 py-4 pl-4 w-[80%]"
           >
             
             {i}
           </li>
         ))}
       </ul>
      </div>
       
      </div>
    </div>
  );
}

export default Home;
