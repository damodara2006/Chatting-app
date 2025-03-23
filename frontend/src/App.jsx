import React, { useState } from 'react'
import axios from  "axios"
import {BrowserRouter , Route , Routes} from "react-router-dom"
import Login from './Pages/Login';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
function App() {
  
 
  return (

     
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
   
  )
}

export default App
