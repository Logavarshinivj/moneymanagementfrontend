import React from 'react'

import { useParams } from 'react-router-dom'
function Sample({trans,id}){
    
    
    const deleteUser=async(id)=>{
        console.warn(id)
      let result= await fetch (`https://moneymanagementbackend-fyv5.vercel.app/get-transaction/${id}`,{
        method: 'DELETE',
      });
      result=await result.json();
      if(result){
        alert("user deleted successfully")
      }
      }
    return(
      
            <tr>
            <td>{trans.amount}</td>
            <td>{trans.type}</td>
            <td>{trans.category}</td>
            <td>{trans.description}</td>
            <td>{trans.date}</td>
            
            <td><button onClick={()=>deleteUser(trans._id)}>Delete</button></td>
            </tr>
           
            
      
    
    )
  }
  
export default Sample