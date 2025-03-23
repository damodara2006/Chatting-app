import React, { useState } from 'react'
import axios from  "axios"
import {BrowserRouter , Route , Routes} from "react-router-dom"
import Login from './Pages/Login';
import Home from './Pages/Home';
function App() {
  
 
  return (

     
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
   
  )
}

export default App
