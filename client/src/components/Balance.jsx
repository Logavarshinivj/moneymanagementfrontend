import React, { useEffect, useState } from 'react'


const balance = () => {
 const [bal,setBal]=useState([])
  const getAllTransactions=async()=>{
    try{
      const res=await axios .post("https://moneymanagementbackend-fyv5.vercel.app/get-transaction")
      setBal(res.data)
      console.log(res.data)
    }
    catch{
      console.log("error")
    }
  }
  useEffect(()=>{
    getAllTransactions()
  })
    const totalIncomeTransaction=bal.filter(transaction=>transaction.type==="income")
    const totalExpenseTransaction=bal.filter(transaction=>transaction.type==="expense")
  
    const totalCredit=bal.filter(transaction=>transaction.type==="income").reduce((acc,trans)=>acc + trans.amount,0)
const totalDebit=bal.filter(transaction=>transaction.type==="expense").reduce((acc,trans)=>acc + trans.amount,0)
const balance=0+totalCredit-totalDebit

  return (
    <div><h1>{totalCredit}</h1></div>
    
  )
}

export default balance