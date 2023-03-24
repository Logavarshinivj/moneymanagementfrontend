import { useState } from 'react'
import{Routes,Route, useNavigate,Outlet} from "react-router-dom"
import reactLogo from './assets/react.svg'
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import './App.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import{Navigate} from "react-router-dom"
import Edit from "./components/Edit"


function App() {
  const auth=localStorage.getItem('user')
  const logout=()=>{
    localStorage.clear()
    navigate("/login")
  }
  const navigate=useNavigate()
  return (
    <div className="App">
      {auth?
     <AppBar sx={{backgroundColor:"#ff9100"}} position="relative" className='AppBar'>
        <Toolbar className='test'>
        <Button onClick={()=>navigate("/")} color="inherit">Home</Button>
        
        
        

         <Button onClick={logout}  color="inherit">Logout</Button>
        </Toolbar>
        </AppBar>:
       <AppBar sx={{backgroundColor:"#ff9100"}} position="static" className='AppBar'>
       <Toolbar>
       <Button onClick={()=>navigate("/signup")} color="inherit">Sign Up</Button>
        <Button onClick={()=>navigate("/login")} color="inherit">LogIN</Button>
        
        
       </Toolbar>
        </AppBar>
}

    <Routes>
      <Route element={<Private/>}>
      <Route path="/" element={< Home title='Home' /> } />
      <Route path="/update-transaction/:id" element={< Edit title='Test' /> } />
     
      </Route>
      <Route path="/signup" element={< Register title='Register' /> } />
      <Route path="/login" element={< Login title='Login' /> } />

    </Routes>
    </div>
  )
}

function Private(){
  
  const auth=localStorage.getItem('user')
   return auth? <Outlet/>:<Navigate to="signup"/>

}
export default App


