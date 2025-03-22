import React, { useEffect } from 'react'
import  { useState } from 'react'
import axios from  "axios"
function Home() {
    const[data,setdata] = useState()
    const handlefile =async ()=>{
        let inp = document.getElementById("in");
        let data = inp.files[0]
       let file =  new FormData()
        await file.append( "file" , data) 
    
        axios.defaults.withCredentials = true
        axios.post("http://localhost:8080/profilepic" , file ,{
          headers:{
            "Content-Type": "multipart/form-data",
          }
        })
        .then(res=>console.log(setdata(res.data)))
      }
      
      useEffect(()=>{
        axios.get("http://localhost:8080/checks",{withCredentials:true})
        .then(res=>setdata(res.data.user))
      },[])


      console.log(data)
  return (
    <div>
       <input type="file" id='in'  />
       <button onClick={handlefile} >Submit</button>
       <center>
        <h1>{data?.email}</h1>
        <img src={data?.profile} style={{borderRadius:"100%" ,width:'500px'}} alt="" />
       </center>
    </div>
  )
}

export default Home
