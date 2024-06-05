import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='container text-center pt-5'>
        <h1 className='pt-5'>Home Page of dashboard</h1>
        <button className='btn btn-primary'>
            <Link className='text-white' to="/expense_tracker">click here</Link>
        </button>
    </div>
  )
}
