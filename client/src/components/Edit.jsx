import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useParams,Navigate,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
const Edit = ({date1}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [amount,setAmount]=useState("")
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const[description,setDescription]=useState("")
  const[date,setDate]=useState(moment().format("YYYY-MM-DD"))
  const{id}=useParams()
  const navigate=useNavigate()
  useEffect(()=>{
    getTransaction()

  },[])


  const getTransaction=async()=>{
    var result=await fetch(`https://moneymanagementbackend-fyv5.vercel.app/get-transaction/${id}`)
    result= await result.json()
    console.log(result)
    console.log(result.amount)
    console.log(result.date)
    setAmount(result.amount)
    setType(result.type)
    setCategory(result.category)
    setDescription(result.description)
    setDate(result.date)
   
  }
  

    const updateTransaction=async()=>{
        let result=await fetch(`https://moneymanagementbackend-fyv5.vercel.app/update-transaction/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ amount,type,category,description,date}),
          headers: { 'Content-Type': 'application/json'}
        })
      
        result= await result.json()
        
      }
  return (
    <div>
       {/* <Modal
      
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      > */}
        <Box sx={{ ...style, width: 300 }} 
        >
          <div className='add-form'>
          <h2 id="child-modal-title">Add Transaction</h2>
          <TextField  id="outlined-basic" label="Amount" type="text"  placeholder="Enter the Amount" value= {amount} onChange={(event)=>setAmount(event.target.value)}></TextField>
          <InputLabel id="demo-simple-select-label" >Type</InputLabel>
          <Select name="type" color="secondary" value={type} onChange={(event)=>setType(event.target.value)}>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select name="category" color="secondary" value={category}   onChange={(event)=>setCategory(event.target.value)}>
          <MenuItem value="salary">Salary</MenuItem>
          <MenuItem value="tips">Tips</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="dress">Dress</MenuItem>
          <MenuItem value="bills">Bills</MenuItem>
          <MenuItem value="medical">Medical</MenuItem>
          <MenuItem value="fees">Fees</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
          </Select>
          <TextField  id="outlined-basic" label="Description" type="text"  placeholder="Enter the description" value={description} onChange={(event)=>setDescription(event.target.value)}></TextField>
          <TextField  id="outlined-basic"  type="date"  placeholder="Enter the reference" value={date} onChange={(event)=>setDate(event.target.value)}></TextField>
          <div className='btn'>
          <Button variant="contained" onClick={updateTransaction}  sx={{backgroundColor:"#ff9100"}}type="submit" >Save</Button>
       
          </div>
          </div>
        </Box>

        {/* <Button variant="contained" onClick={navigate("/")} sx={{backgroundColor:"#ff9100"}}>Close</Button> */}
      {/* </Modal> */}
    </div>

  )
}

export default Edit