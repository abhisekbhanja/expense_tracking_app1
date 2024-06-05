import React, { useEffect, useState } from 'react'

export default function Pagination() {
const [comment, setcomment] = useState([])
const [btn, setbtn] = useState({start:0,end:5})

    const showData=async()=>{
       const data=await fetch("https://jsonplaceholder.typicode.com/comments")
       setcomment(await data.json());
    }
    useEffect(() => {
     showData()
    }, [])

    const next=()=>{
        if(btn.end<comment.length){
            setbtn({start:btn.start+5,end:btn.end+5})
        }
    }
    const prev=()=>{
       
           if(btn.end>5){
            setbtn({start:btn.start-5,end:btn.end-5})
           }
        
    }
    
  return (
    <div className='container'>
        <h1 className='text-center p-2'>Pagination</h1>
        <div className="">
            <table className='table table-bordered'>
                <thead className='bg-primary text-white'>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Comment</th>
                </thead>
                {
                    comment.slice(btn.start,btn.end).map(x=>{
                        return <tr key={x.id} style={{height:"100px"}}>
                            <td>{x.id}</td>
                            <td>{x.email}</td>
                            <td>{x.body}</td>
                        </tr>
                    })
                }
            </table>
           <div className="table-btn ">
           <button className='btn btn-primary' onClick={prev}>prev</button>
            <button className='btn btn-primary ml-3' onClick={next}>next</button>
           </div>
        </div>
    </div>
  )
}
