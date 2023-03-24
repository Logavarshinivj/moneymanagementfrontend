import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import{useState} from "react"
import{Link,useNavigate} from "react-router-dom"
import { useEffect } from 'react';
import { Card } from '@mui/material';


function Login() {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()
  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
      navigate("/")
    }
  },[])
  const handleLogin=async()=>{
    let result=await fetch("https://moneymanagementbackend-fyv5.vercel.app/login",
    {
      
      method: 'POST',
    body: JSON.stringify({email,password}),
    headers: { 'Content-Type': 'application/json'}
    })
    result= await result.json()
    if(result.email){
        localStorage.setItem("user", JSON.stringify(result))
        navigate("/")
      }
      else{
        alert("Invalid username or password")
      }
   
  }
  return (
    <div>
    <h1 className="app-name">MY MONEY💰🪙</h1>
    <h2 className="sign-in-heading">SIGN IN</h2>

    <div className="sign-in">
    
    <label className='lbl1'><b>Email Address
        </b>
        </label>
        <input type="email" name="email" className="Uname" placeholder="Email Address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <br></br>
        <br></br>
        <label className='lbl2'><b>Password
        </b>
        </label>
        <input type="password" name="pass" className="pass" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        <br></br>
        <br></br>
      {/* <TextField  id="standard-basic" label="Email Address" variant="standard"color="secondary" type="email" placeholder="Enter your email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <TextField id="standard-basic" label="Password" variant="standard"color="secondary" type="password"  placeholder="Set your password" value={password} onChange={(event)=>setPassword(event.target.value)}/> */}
      <button variant="contained"  type="button" className='btn-signin' onClick={handleLogin} >LOGIN</button> 
     
    </div>
    </div>
 
    
   
 
  )
}

export default Login