import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Scroll() {
const [comment, setcomment] = useState([])
const [hasMore, sethasMore] = useState(true)
const [page, setpage] = useState(1)
const [datalen, setdatalen] = useState(1)


    const showData=async()=>{
        const data=await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${page}`)
       //setdatalen(data.data.length)
        const merge=[...comment,...data.data]
       setcomment(merge);
       setpage(page+1)
    }
    useEffect(() => {
     showData()
    
    
    }, [])


    const fetchMoreData = () => {
            setTimeout(() => {
              showData() 
            }, 2000);       
      };

  return (
    <div className='container'>
        <h1 className='text-center p-2'>Pagination</h1> 
        <InfiniteScroll
    dataLength={comment.length}
    next={fetchMoreData}
    //style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    //inverse={true} //
    hasMore={comment.length<99}
    loader={<h4 className='text-primary text-center'>Loading...</h4>}
    //scrollableTarget="card"
  >
     {
                    comment.map(x=>{
                        return <div className='card p-3 mt-4 bg-success text-white' key={x.id} >
                            <h5>{x.id}</h5>
                            <h5>{x.title}</h5>
                            <h5>{x.body}</h5>
                        </div>
                    })
                }
  </InfiniteScroll>
    </div>
  )
}
