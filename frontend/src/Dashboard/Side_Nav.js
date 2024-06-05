import React from 'react'
import "../dashboard.css"
import { Link, Outlet } from 'react-router-dom'
export default function Side_Nav() {
  return (
    <div className='d-flex'>
      <div className='side_nav'>
        <div className='nav_links'>
        
            <div className='nav_link'>
            <Link className="text-white dashboard_nav_links" to="/expense_tracker">Expense Tracker</Link>
            </div>
           
            
            
        </div>
       
    </div>
    <Outlet />
    </div>
  )
}
