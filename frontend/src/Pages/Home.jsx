import React, { useEffect } from 'react'
import  { useState } from 'react'
import axios from  "axios"
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Home() {
    const[data,setdata] = useState()
    const[profile,setprofile] = useState(false)
    const navigate = useNavigate()
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
        .then(res=>{
        if(typeof(res.data.profile) == 'string'){
          toast.success('Updated')
        }
        setdata(res.data)})
      }
      
      useEffect(()=>{
        axios.get("http://localhost:8080/checks",{withCredentials:true})
        .then(res=>setdata(res.data.user))
      })

      const handlelogout = ()=>{
        axios.defaults.withCredentials=true
        axios.post("http://localhost:8080/logout")
        navigate('/')

      }
      
      
  return (
    <div>
      <ToastContainer/>
      {
        data?<center className='flex justify-evenly max-h-20  mt-4'>
        <h1 className='w-[40%]'>{data?.email}</h1>
        <img src={data?.profile} className='active:scale-90 w-[40%]' onClick={()=>setprofile(!profile)} style={{borderRadius:"100%" ,width:'30px', height:'30px'}} alt="" />
      <button className='w-[20%]' onClick={handlelogout} >Logout</button>
      
       </center> : "Please login"
      }
       
       {
      profile?
      <center className=' items-center justify-center mt-10'>
      <input type="file" id='in' className='' />
      <img src={data?.profile} className='mt-5 h-96 w-80' style={{borderRadius:"100%" }} alt="" />
      <button onClick={handlefile} className='border px-5 py-2 mt-4 rounded-md hover:bg-gray-400 transition-all duration-75 ease-in active:scale-75 ' >Submit</button>
      </center> :""
     } 
    </div>

    
  )
}

export default Home
