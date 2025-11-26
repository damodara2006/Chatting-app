import React, { useEffect , useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";
import { io } from "socket.io-client";
import { BsDot } from "react-icons/bs";

const BASE_URL = "http://localhost:8080";
function Home() {
  const [data, setdata] = useState();
  const [profile, setprofile] = useState(false);
  const [messageheader, setmessageheader] = useState([]);
  const navigate = useNavigate();
  const [userid, setuserid] = useState();
  const [uniqueArray, setuniqueArray] = useState([]);
  const [user, setuser] = useState([]);
  const [newemail, setnewemail] = useState();
  const [newtext, setnewtext] = useState();
  const [adduser, setadduser] = useState(false);
  const [userpic, setuserpic] = useState([]);
  const [onlineuers, setonlineuser] = useState([]);
  const[top,settop] = useState(-1000)
  const[pictop,setpictop] = useState(-1000)
  let inp = document.getElementById("in");
  const handlefile = async () => {
    let inp = document.getElementById("in");
    let data = inp.files[0];
    let file = new FormData();
    await file.append("file", data);

    axios.defaults.withCredentials = true;
    axios
      .post(`${BASE_URL}/profilepic`, file, {
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

  const logref = useRef(null)
  // useEffect(()=>{
  //   let file = new FormData()
  //   file?.append( "file", inp?.files)
  //   console.log(inp?.files)
  // })

  useEffect(() => {
    axios.get(`${BASE_URL}/checks`, { withCredentials: true }).then((res) => {
      setdata(res.data.user);
      const socket = io(BASE_URL, {
        query: {
          userId: res.data.user._id
        }
      });
      socket.connect();

      socket.on("getloggedUsers", (usersid) => {
        setonlineuser(usersid);
      });
    });
  }, [onlineuers.length]);

  const handlelogout = () => {
    axios.defaults.withCredentials = true;
    axios.post(`${BASE_URL}/logout`).then(async (res) => {

      toast.success("Logged out", { autoClose: 1500 });
      setTimeout(() => {
      navigate("/", { state: { log: true } });
      },2000);
    });
  };

  // useEffect(()=>{
  //   window.location.reload()

  // },[])
  useEffect(() => {
    setuserid(data?._id);
  }, [userid, data]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${BASE_URL}/messages`, { senderid: userid })
      .then((res) => setmessageheader(res.data));
  }, [ userid]);

  // console.log(userid)

  // console.log(messageheader.filter((item) => item));
  let array;

  array = [...new Set(messageheader)];
  array = array.filter((item) => data?._id !== item);

  useEffect(() => {
    if (array.length > 0) {
      axios.defaults.withCredentials = true;
      console.log(JSON.stringify(array));
      
      axios
        .post(`${BASE_URL}/users`, { array: array, username:data._id })
        .then((res) => {
          setuser(res.data);
          // console.log(res);
          
        })
    }
  }, [user.length, array.length]);

  useEffect(() => {
    if (user.length > 0) {
      axios
        .post(`${BASE_URL}/userprofile`, { array: user, username: data._id })
        .then((res) => setuserpic(res.data));
    }
  }, [user.length]);
  

  const handlechat = (key, user) => {
    axios.defaults.withCredentials = true;
    axios.post(`${BASE_URL}/usermsg/${userid}/${array[key]}`).then((res) => {
      navigate("/chat", {
        state: { data: res.data, user: userid, key: array[key], username: user }
      });
    });
  };

  const handleadduser = () => {
    axios
      .post(`${BASE_URL}/newmessage`, {
        senderid: userid,
        receiveremail: newemail,
        text: newtext
      })
      .then((res) => {
        if (res.data == "No user found") {
          return toast.error("No user found", { autoClose: 1500 });
        }
        if (res.data) {
          toast.success("Message sent", { autoClose: 1500 });
        }
      });
  };
  // useEffect(()=>{
  // console.log(onlineuers)
  // },[onlineuers.length])
  const FastImage = React.memo(({ src }) => {
    return <img src={src} className="w-12 my-5 h-12 rounded-full mr-5" loading="lazy" />;
  });

  return (
    <div className="relative h-screen ">
      <ToastContainer />
      {data  ? (
        <div className="mt-17 -mb-16 flex justify-center absolute w-full h-full  items-center p-14 overflow-hidden  ">
          <div className="flex flex-col justify-center   w-[75%] rounded-4xl backdrop-blur-sm items-center  transition-all h-96 border top-0 absolute ease-in-out z-40 " style={{top:`${top}px`}}>
            <input
              type="text"
              className="border h-11 pl-5 w-[80%]  outline-0 rounded-xl bg-gradient-to-tr from-purple-300 to-cyan-200 font-mono text-sm "
              placeholder="Enter sender email"
              value={newemail}
              onChange={(e) => setnewemail(e.target.value)}
            />{" "}
            <br />
            <input
              type="text"
              className="border h-11 w-[80%] pl-5 outline-0 rounded-xl
              bg-gradient-to-tl from-purple-300 to-cyan-200 font-mono text-sm"
              placeholder="Start with Hi "
              value={newtext}
              onChange={(e) => setnewtext(e.target.value)}
            />{" "}
            <br />
            <button className="border h-10 w-20 z-50 active:scale-90 rounded-4xl hover:bg-gray-300 transition-all duration-150 bg-white font-mono" onClick={handleadduser}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {data ? (
        <center className="flex justify-evenly max-h-20 fixed border py-3.5 w-full top-0 bg-gradient-to-r from-green-400 to-green-600 z-50 ">
          <div className="w-[55%] relative flex right-0">
            <h1 className="absolute text-center font-extrabold text-xl w-full">{data?.username}</h1>
          </div>
          <div className="mx-5">
           
          <img
              src={data?.profile}
              
            className="active:scale-90 w-[20%] "
            onClick={() => setpictop((prev)=>{
              if(prev == -1000){
                return 0
              }
              else{
                return -1000
              }
            })}
            style={{ borderRadius: "100%", width: "30px", height: "30px" }}
            alt=""
          />
          </div>
         

          <div className="text-3xl mx-5 ">
            <IoMdContacts
              onClick={() => {
                settop((prev)=>{
                  if(prev == -1000){
                    return 0
                  }
                  else{
                    return -1000
                  }
                })
                setadduser(!adduser)}}
              className="active:scale-75 transition-all "
            />
          </div>
          <button
            className="w-[10%] z-50 font-winky border  rounded-lg hover:bg-gradient-to-r from-gray-300 to-gray-500 transition-all duration-400 flex justify-center items-center mr-5"
            onClick={handlelogout}
            ref={logref}
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

      {data  ? (
        <center className=" absolute z-40  items-center justify-center mt-17 w-[100%] h-[50%] transition-all duration-200 " style={{top:`${pictop}px`}}>
          <div className="w-[65%] h-[85%] border backdrop-blur-sm rounded-4xl  z-50" >
          <input type="file" id="in" className="mt-10 ml-[10%] text-sm relative " />
          <div className=" w-fit  overflow-hidden  flex justify-center  items-center mt-5">
            <img src={data?.profile} className=" h-[190px] w-[190px] rounded-2xl" alt="" />
          </div>

          <button
            onClick={handlefile}
            className="border px-5 py-2 mt-4 rounded-md hover:bg-gray-400 transition-all duration-75 ease-in active:scale-75 mb-6 "
          >
            Submit
          </button>
          </div>
         
        </center>
      ) : (
        ""
      )}
      <div className="flex  w-[100%]   ">
        <div className="flex w-[100%] justify-center items-center ml-[14%]">
          <ul className="mt-16 flex flex-col  justify-center  items-center">
           
           {userpic.map((item, key) => (
             item ? <li className="relative" key={key}>
               <FastImage src={item} />
             </li> : null
))}
           

            {/* <img src={userpic[1]} className="w-9" ></img> */}
          </ul>
          <ul className="mt-18 flex flex-col  w-[90%] z-30">
            {console.log(user)
            }
            {user.length !== 0
              ? user?.map((i, key) => (
                i[0] ? <li
                  key={key}
                  onClick={() => handlechat(key, i[0])}
                  className="border rounded-3xl mb-1 py-4 pl-4 w-[80%] relative bg-gradient-to-r from-gray-300"
                >
                  {i[0]}
                  {onlineuers.includes(i[1]) ? (
                    <p className="text-green-600">online</p>
                  ) : (
                    <p className="text-red-500">offline</p>
                  )}
                </li> : ""
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
