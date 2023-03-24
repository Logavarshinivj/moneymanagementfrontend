import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import{useState} from "react"
import{Link, useNavigate} from "react-router-dom"
import { useEffect } from 'react';

function Register() {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()
  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
      navigate("/")
    }
  },[])
  const collectData=async()=>{
    let result=await fetch("https://moneymanagementbackend-fyv5.vercel.app/register",
    {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: { 'Content-Type': 'application/json'}
    })
  
    result= await result.json()
    if(result){
        localStorage.setItem("user", JSON.stringify(result))
       
        alert("Registration Successful")
          
      }
    else{
        alert("already registered")
    }
    
    // if(result){
    //   localStorage.setItem("user", JSON.stringify(result))
    //   navigate("/")
    // }
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
        <input type="password" name="pass" className="pass"  placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        <br></br>
        <br></br>
      {/* <TextField  id="standard-basic" label="Email Address" variant="standard"color="secondary" type="email" placeholder="Enter your email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <TextField id="standard-basic" label="Password" variant="standard"color="secondary" type="password"  placeholder="Set your password" value={password} onChange={(event)=>setPassword(event.target.value)}/> */}
      <button variant="contained"  type="button" className='btn-signin' onClick={collectData} >Sign Up</button> 
      <br></br>
      <br></br>
      <Link to="/login" className='link'>Already Registered? Click Here to login</Link>
     
    </div>
   
    </div>
  //   <div className='signup-form'>
  //   <h1>Register</h1>
  //   <TextField  id="standard-basic" label="Email Address" variant="standard"color="secondary" type="email" placeholder="Enter your email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
  //   <TextField id="standard-basic" label="Password" variant="standard"color="secondary" type="password"  placeholder="Set your password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
  //   <Button  variant="contained"  type="button" onClick={collectData} >Sign Up</Button>
  //   <Link to="/login">Already Registered? Click Here to login</Link>
   
  // </div>
  )
}

export default Register