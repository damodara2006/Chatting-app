import React, { useState } from 'react'
import axios from  "axios"
function App() {
  const [filename , setfilename] = useState();
  const handlefile = ()=>{
    let inp = document.getElementById("in");
    

   let file = new FormData()
    file.append( "file" ,inp.value)

    console.log(file)
    axios.defaults.withCredentials = true
    axios.post("http://localhost:8080/profilepic" , {file})
    .then(res=>console.log(res))
  }
 
  return (
    <div>
      <input type="file" id='in'  />
      <button onClick={handlefile} >Submit</button>
    </div>
  )
}

export default App
