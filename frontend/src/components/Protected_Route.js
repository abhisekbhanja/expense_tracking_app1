import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected_Route({children}) {
    const token=localStorage.getItem("usertoken")
    if (token) {
       return children 
    }
    else{
        return (
    
            <Navigate to="/" />
          )
    }
  
}

export default Protected_Route