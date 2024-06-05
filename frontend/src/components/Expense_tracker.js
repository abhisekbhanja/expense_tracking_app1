import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'


export default function Expense_tracker({chart_data,user_email,expense_details,get_user_data}) {
    const [expense_amount, setexpense_amount] = useState(0)
    const [expense_type, setexpense_type] = useState("")
 
   const [err, seterr] = useState("")
   useEffect(() => {
    get_user_data()
  },[])
    
    const add_expense=async(e)=>{
        e.preventDefault()
       if (expense_type===" " || expense_amount===0) {
        seterr("please add your expenses")
       }
       else{
        try {
          await axios.post(`${process.env.REACT_APP_SERVER_URL}/add_expense`,{
           email:user_email,expense_type:expense_type,
             expense_amount:expense_amount})
             get_user_data()
            seterr(" ")
         } catch (error) {
           
         }
       }
            
    }
  return (
    <>
    <div className='p-4 w-100'>
      <div className='d-flex'>
      <h1 className='mt-2'>Expense Tracker</h1>

      </div>
      <div className='row'>

            <div className='col-md-6'>
            <div className='card p-3'>
            <form>
        <div className="form-group">
          <label htmlFor="">Expense Amount</label>
          <input type="number" className="form-control" name="expense_amount" 
          onChange={(e)=>setexpense_amount(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="">Expense Type</label>
          <input type="text" className="form-control" name="expense_type"
          onChange={(e)=>setexpense_type(e.target.value)} />
        </div>
        <div className="form-group">
         
          <button type="submit" className="btn btn-success" 
          onClick={add_expense}>add expense</button>
        </div>
        <div>
          <p className='text-danger'>{err}</p>
        </div>
    </form>
    {/* <button type="submit" className="btn btn-success" 
          onClick={get_shopping_data}>refresh</button> */}
            </div>
            </div>
            <div className='col-md-6'>
            <div className='card py-2' width={371} height={300}>
    {chart_data.length===0?"n data":
    <Chart 
    options={{
      chart: {
        width: 380
      },
      labels: chart_data.map(x=>x.expense_type),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }} 
  series={chart_data.map(x=>x.expense_amount)} 
  type="pie" width={371} height={300} />}
        </div>
            </div>
            <div className='col-md-4'>
            <div className='mt-3 card p-3'>
            {expense_details?.length===0?
         <h5 className='text-center p-5'>no data</h5>:
   <table className='table' >
          <thead>
            <tr>
            <th>Expense Date</th>
            <th>Expense Type</th>
            <th>Expense Amount</th>
            </tr>
          </thead>
        
         
           <>
           {expense_details.map(x=>{
            return <tbody  key={x._id}>
              <tr>
              <td>{x.date}</td>
              <td>{x.expense_type}</td>
              <td>{x.expense_amount}</td>
            </tr>
            </tbody>
           
          })}</>
        </table>
}
   </div>
            </div>

            {/* <div className='col-md-8'>
              <div className='card mt-3'>
              <Chart options={{
        chart: {
          id: 'apexchart-example'
        },colors:'#9C27B0',
        xaxis: {
          categories: chart_data.map(x=>x.expense_type)
        }
      }} 
      series={[{
        name: 'price',
        data: chart_data.map(x=>x.expense_amount)
      }]} type="bar" width={500} height={500} />
              </div>
            </div> */}
      </div>
        
        
   </div>
    </>
  )
}
