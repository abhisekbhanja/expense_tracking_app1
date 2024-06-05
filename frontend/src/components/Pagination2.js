import React, { useEffect, useState } from 'react'

export default function Pagination2() {
const [comment, setcomment] = useState([])
const [page, setpage] = useState(50)
const [btn, setbtn] = useState({start:0,end:page})
const [total, settotal] = useState()
const [count, setcount] = useState(1)

    const showData=async()=>{
       const data=await fetch("https://jsonplaceholder.typicode.com/comments")
       setcomment(await data.json());
    }
    useEffect(() => {
     showData()
    
    
    }, [])


   useEffect(() => {
    settotal(comment.length)
   }, [])
   
    const next=()=>{
        if(btn.end<comment.length){
            
            setbtn({start:btn.start+page,end:btn.end+page})
            setcount(count+1)
        }
    }
    const prev=()=>{
       
           if(btn.end>page){
            setbtn({start:btn.start-page,end:btn.end-page})
            setcount(count-1)
           }
        
    }

    const showpage=(index)=>{
        setbtn({start:page*index,end:page*(index+1)})
        console.log(index+1 +" : "+count);
        setcount(index+1)
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
           {/* <button className='btn btn-primary' onClick={prev}>prev</button>
            <button className='btn btn-primary ml-3' onClick={next}>next</button> */}
            
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <button className="btn page-link"  aria-label="Previous" onClick={prev}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                
                {
                    new Array(comment.length/page).fill(" ").map((el,index)=>(
                        <li className={`page-item ${index+1===count? "active":" "}`}><button className="page-link" 
                        onClick={ ()=>{showpage(index)}}
                        >{index+1}</button></li>
                    ))
                }
                <li className="page-item">
                  <button className="btn page-link"  aria-label="Next" onClick={next}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
           </div>
        </div>
    </div>
  )
}
