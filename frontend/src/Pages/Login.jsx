import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [login,setlogin] = useState(true);
  const [username,setusername] = useState()
  const navigate = useNavigate();
  const handlesubmitlogin = () => {
    axios
      .post(
        "http://localhost:8080/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {console.log(res)
        toast(res.data)
        if(res.data == "Loggedin"){
          navigate('/home')
        }
      }); 
  };

  const handlesubmitnew = ()=>{
    axios
      .post(
        "http://localhost:8080/newuser",
        { email, password ,username},
        { withCredentials: true }
      )
      .then((res) => {console.log(res)

        if(res.status==201){
        toast.success(res.data + " registered")
        }
        else{
          toast.error(res.data)
        }


        
      }); 
  }


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ToastContainer/>
      {login ? <div className="flex flex-col w-[500px] items-center border p-20 rounded-2xl "  >
        <input
          type="text"
          className="border outline-0 w-full rounded-2xl h-11 pl-5"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email"
        />
        <br />
        <input
          type="text"
          className="border outline-0 w-full rounded-2xl h-11 pl-5"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password"
        />
        <br />
        <button className="border px-5 py-1.5 rounded-sm" onClick={handlesubmitlogin}>Submit</button>
        <br />
        
        <h1 className="w-fit hover:text-blue-700 cursor-pointer" onClick={()=>setlogin(!login)} >New user?</h1>

      </div> : <div className="flex flex-col w-[500px] items-center border p-20 rounded-2xl "  >
      <input
          type="text"
          className="border outline-0 w-full rounded-2xl h-11 pl-5"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Enter username"
        />
        <br />
        <input
          type="text"
          className="border outline-0 w-full rounded-2xl h-11 pl-5"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email"
        />
        <br />
        <input
          type="text"
          className="border outline-0 w-full rounded-2xl h-11 pl-5"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password"
        />
        <br />
        
        <br />
        <button className="border px-5 py-1.5 rounded-sm" onClick={handlesubmitnew}>Submit</button>
        <br />
        <h1 className="w-fit hover:text-blue-700 cursor-pointer" onClick={()=>setlogin(!login)} >Login</h1>

      </div>}
      
      
    </div>
  );
}

export default login;
