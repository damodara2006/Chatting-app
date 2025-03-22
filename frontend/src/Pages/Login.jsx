import axios from 'axios';
import React, { useState } from 'react'

function login() {

    const[email,setemail] = useState();
    const[password,setpassword] = useState();

    const handlesubmit = ()=>{

      axios.post("http://localhost:8080/login" ,{email, password} ,{withCredentials:true})
      .then(res=>console.log(res))
    }

  return (
    <div>
      <input type="text" value={email} onChange={e=>setemail(e.target.value)}/>
      <input type="text" value={password} onChange={e=>setpassword(e.target.value)}/>
      <button onClick={handlesubmit} >Submit</button>
    </div>
  )
}

export default login
