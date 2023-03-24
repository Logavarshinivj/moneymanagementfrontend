import React from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react'
import {Table} from "antd"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import 'antd/dist/reset.css';
import Analytics from './Analytics'
import Balance from './Balance';
import { createTheme } from '@mui/material/styles';
import moment from 'moment';
import { Space } from 'antd';
import Delete from './Delete';
import {Link} from "react-router-dom"


import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {UnorderedListOutlined,AreaChartOutlined, OrderedListOutlined} from "@ant-design/icons";
import { FormContext } from 'antd/es/form/context';
import { red } from 'colors';


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

export default function Home() {

  const[transaction,setTransaction]=useState("")
  const[frequency,setFrequency]=useState("7")
  const[allTransaction,setAllTransaction]=useState([])
  const[selectType,setSelectType]=useState("all")
  const[viewData,setViewData]=useState("table")
  const[editData,setEditData]=useState(null)

  

  const columns=[
  {
      title:"Date",
      dataIndex:"date",
      render:(text)=><span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title:"Amount",
      dataIndex:"amount",
    },
    {
      title:"Type",
      dataIndex:"type",
    },
    {
      title:"Category",
      dataIndex:"category",
    },
    {
      title:"Description",
      dataIndex:"description",
    },
    {
      title:"Action",
      key:"action",
      render:(text,record) => (
        <div>
       
          {/* <button onClick={()=>{setEditData(record)
          handleOpen()
          }}>Edit </button> */}
        
          <Delete allTransaction={allTransaction} />
          <Link to={"/update-transaction/"+ allTransaction[0]._id }>Edit</Link>
      
        </div>
      )
    }

  ]

  // const [balance,setBalance]=useState(0)
  // if(allTransaction.type==="income"){
  //   setBalance(balance +allTransaction.amount)
  // }
  // else{
  //   setBalance(balance-allTransaction.amount)
  // }

  // useEffect(()=>{
  //   fetch("http://localhost:4000/get-transaction")
  // .then((res)=>res.json())
  // .then((data)=>console.log(data))
  // },[])

  // const getAllTransactions=async()=>{
  
  //   let result=await fetch("http://localhost:4000/get-transaction",
  //   {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json'}
  //   })
  
  //   result= await result.json()
  // }

  const getAllTransactions=async()=>{
    try{
      const user=JSON.parse(localStorage.getItem('user'));
      const res=await axios .post("https://moneymanagementbackend-fyv5.vercel.app/get-transaction",{
        frequency,selectType})
      setAllTransaction(res.data)
      console.log(res.data)
    }
    catch{
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllTransactions()
  },[frequency,selectType])

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [amount,setAmount]=useState("")
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const[description,setDescription]=useState("")
  const[date,setDate]=useState("")
  
  const newtransaction={
    amount,
    type,
    category,
    description,
    date
  }
// const handleSubmit=()=>{
//   console.log(amount,type,category,desc,date)
// }
// const handleSubmit = (e) => {
//   e.preventDefault();
//   axios
//      .post('http://localhost:4000/add-transaction', newtransaction)
//      .then((res) => {
//         setAmount((amount) => [res.data, ...amount]);
//         setType((type) => [res.data, ...type]);
//         setCategory((category) => [res.data, ...category]);
//         setDescription((description) => [res.data, ...description]);
//         setDate((date) => [res.data, ...date]);
       
//      })
     
    
   
//      .catch((err) => {
//         console.log(err.message);
//      });
// };

const handleSubmit=async()=>{
  const user=localStorage.getItem('user');
  let result=await fetch("https://moneymanagementbackend-fyv5.vercel.app/add-transaction",
  {
    method: 'POST',
    body: JSON.stringify({amount,
      type,
      category,
      description,
      date,userid:user._id}),
    headers: { 'Content-Type': 'application/json'}
  })

  result= await result.json()
}


// const handleSubmit=async(values)=>{
//   try{
//     const user=JSON.parse(localStorage.getItem("user"))
//     await axios.post("http://localhost:4000/add-transaction",{...values,userid:user._id})
//     console.log("success")
//     handleClose()
//   }
//   catch{
//     console.log("failed")
//   }

// }
  // const handleChange = (event) => {
  //   setType(event.target.value );
  // };
  return (
    <div className='secondbar'>
      {/* <Balance/> */}
    <div className='filters'>
      {/* <div> Range filters</div> */}
       <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel sx={{color:"Orangered",fontWeight:"bold",fontSize:"20px"}} id="demo-simple-select-standard-label">Select By Range</InputLabel>
    
      <Select  sx={{color:"black"}}id="demo-simple-select-standard" name="frequency" color="primary" value={frequency} onChange={(event)=>setFrequency(event.target.value)}>
          <MenuItem value="7">Last 1 week</MenuItem>
          <MenuItem value="30">Last 1 month</MenuItem>
          <MenuItem value="365">Last 1 year</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
      </Select>
     
      </FormControl>
      </div> 
       <div>
      
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel sx={{color:"Orangered",fontWeight:"bold",fontSize:"20px"}} id="demo-simple-select-standard-label">Select By Type</InputLabel>
      <Select  id="demo-select-small" labelId="demo-select-small"name="selectType" color="secondary" value={selectType} onChange={(event)=>setSelectType(event.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
         
      </Select>
      </FormControl>
      </div>
     {/* <div className="btns"> */}
      <div className='icons1'>
       {/* <FormatListBulletedIcon/> */}
      
       <Button  variant="contained"  sx={{backgroundColor:"#ff9100"}} onClick={()=>setViewData("table")}>Table</Button>
       <Button  variant="contained"  sx={{backgroundColor:"#ff9100"}} onClick={()=>setViewData("chart")}>Chart</Button>
       {/* <UnorderedListOutlined onClick={()=>setViewData("table")}/> */}
       {/* <AreaChartOutlined onClick={()=>setViewData("chart")}/> */}
       
      </div>

      <Button variant="contained" sx={{backgroundColor:"#ff9100"}}onClick={handleOpen}>Add new</Button>
   </div>
   {/* </div> */}

   <h2 className='app-name'>WELCOME TO MY MONEY💰🪙🎉</h2>
{/* <div className='select'>
   <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel sx={{color:"Orangered",fontWeight:"bold",fontSize:"20px"}} id="demo-simple-select-standard-label">Select By Range</InputLabel>
    
      <Select  sx={{color:"black"}}id="demo-simple-select-standard" name="frequency" color="primary" value={frequency} onChange={(event)=>setFrequency(event.target.value)}>
          <MenuItem value="7">Last 1 week</MenuItem>
          <MenuItem value="30">Last 1 month</MenuItem>
          <MenuItem value="365">Last 1 year</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
      </Select>
     
      </FormControl>
      </div>
      <div>
      
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel sx={{color:"Orangered",fontWeight:"bold",fontSize:"20px"}} id="demo-simple-select-standard-label">Select By Type</InputLabel>
      <Select  id="demo-select-small" labelId="demo-select-small"name="selectType" color="secondary" value={selectType} onChange={(event)=>setSelectType(event.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
         
      </Select>
      </FormControl>
      </div>
      </div> */}
    <div className="content">
      {/* <h1>{balance}</h1> */}
      
      {viewData=="table" ? <div> <Table columns={columns} className="tb"dataSource={allTransaction}  /> </div>:<Analytics allTransaction={allTransaction}/>}
      {/* <Table columns={columns} dataSource={allTransaction}/> */}
    
    </div>
    
    <Modal
        title={editData?"EditTransaction":"AddTransaction"}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <div className='add-form'>
          <h2 id="child-modal-title">Add Transaction</h2>
          <TextField  id="outlined-basic" label="Amount" type="text"  placeholder="Enter the Amount" onChange={(event)=>setAmount(event.target.value)}></TextField>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select name="type" color="secondary"  onChange={(event)=>setType(event.target.value)}>
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
          <TextField  id="outlined-basic" label="Description" type="text"  placeholder="Enter the description"  onChange={(event)=>setDescription(event.target.value)}></TextField>
          <TextField  id="outlined-basic"  type="date"  placeholder="Enter the reference" onChange={(event)=>setDate(event.target.value)}></TextField>
          <div className='btn'>
          <Button variant="contained" onClick={handleSubmit}  sx={{backgroundColor:"#ff9100"}}type="submit" initialValueS={editData}>Save</Button>
          <Button variant="contained" onClick={handleClose} sx={{backgroundColor:"#ff9100"}}>Close</Button>
          </div>
          </div>
        </Box>
      </Modal>
     
    </div>
    
  )
}



