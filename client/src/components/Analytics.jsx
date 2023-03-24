import React from 'react'
import {Progress} from "antd"
import { Card ,CardContent} from '@mui/material'

const Analytics = ({allTransaction}) => {
  const totalTransaction=allTransaction.length
  const totalIncomeTransaction=allTransaction.filter(transaction=>transaction.type==="income")
  const totalExpenseTransaction=allTransaction.filter(transaction=>transaction.type==="expense")
  const totalIncome=(totalIncomeTransaction.length/totalTransaction)*100
  const totalExpense=(totalExpenseTransaction.length/totalTransaction)*100
  const totalStatus=allTransaction.reduce(
    (acc,trans)=>acc + trans.amount,0
  )
const totalCredit=allTransaction.filter(transaction=>transaction.type==="income").reduce((acc,trans)=>acc + trans.amount,0)
const totalDebit=allTransaction.filter(transaction=>transaction.type==="expense").reduce((acc,trans)=>acc + trans.amount,0)

const credit=(totalCredit/totalStatus)*100
const debit=(totalDebit/totalStatus)*100
  return (
   <div className='analytics'>
    <div className='analytics1'>

      <Card sx={{backgroundColor:"#ffcc80"}}>
      <CardContent>
      <div className='content1' >
       
        <h3>Total Transaction:{totalTransaction}</h3>
        <strong> <h5 className="incomechart">No of Income Transaction:{totalIncomeTransaction.length}</h5></strong>
        <h5 className="expensechart">No of Expense Transaction:{totalExpenseTransaction.length}</h5>
      </div>
     <br></br>
      <div className="progress1">
        <Progress strokeColor={"#00c853"}  percent={totalIncome.toFixed(0)}/>
        <Progress strokeColor={"#ff3d00"} percent={totalExpense.toFixed(0)}/>
        
        
      </div>
      
  </CardContent>
      </Card>
      </div>
      

      <div className='analytics2'>
      <Card sx={{backgroundColor:"#ffb74d"}}>
      <CardContent>
        <div className='content2'>
        <h3>Total Revenue:{totalStatus}</h3>
        <h5  className="incomechart">Credited:{totalCredit}</h5>
        <h5 className="expensechart">Debited:{totalDebit}</h5>
      </div>
      <br></br>
      <div className='progress2'>
        <Progress strokeColor={"green"}  percent={credit.toFixed(0)}/>
        <Progress strokeColor={"red"}  percent={debit.toFixed(0)}/>
        
        
      </div>
      </CardContent>
      </Card>
      </div>
      </div>
   
    
  )
}

export default Analytics