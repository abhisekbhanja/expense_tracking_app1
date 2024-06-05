import React, { useEffect, useState } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import Side_Nav from './Side_Nav'
import  Axios  from 'axios'

export default function Dashboard_nav({user_detail,get_user_data}) {
    
    const navigate=useNavigate()
    const token=localStorage.getItem("usertoken")
    //user detais
    
 const logout=()=>{
    localStorage.removeItem('usertoken')
    navigate("/")
 }
    useEffect(() => {
        get_user_data()
      },[])
  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-info">
            <a className="navbar-brand" href="#">Expense Tracker</a>
            {/* <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button> */}
            <div className="ml-auto">
                
            
{token?<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
{`${user_detail?.name}`}
</button>:" "}


<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Are you want to logout</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal"
        onClick={logout}>Yes</button>
      </div>
    </div>
  </div>
</div>
                 
                
               
            </div>
        </nav>
        {/* <Side_Nav /> */}
        {/* <Outlet /> */}
    </div>
   
  )
}
