import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function Dashboard_Page() {
  
  const [shopping_data, setshopping_data] = useState([])
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])

  const age = [];
  const salary = [];
  //get api data
  const get_shopping_data=()=>
  {
      try {
        axios.get("https://dummyjson.com/products").then(response =>{
          const allapiData=response.data.products
          var result = [];
          allapiData.reduce(function(res, value) {
            if (!res[value.category]) {
              res[value.category] = { category: value.category, price: 0 };
              result.push(res[value.category])
            }
            res[value.category].price += value.price;
           //console.log(res)
            return res;
          }, []);
          console.log(result)
          result.map(item=>{
            //console.log(item.brand);
            age.push(item.price);
            salary.push(item.category)
          })
          setCategory(salary)
          setData(age)
      })
      } catch (error) {
        console.log(console.error());
      }
      
  }

  useEffect(() => {
    get_shopping_data()
  },[])

  





  return (
    <div className='container-fluid p-5'>
        <h5>Admin Dashboard</h5>
        <Chart options={{
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: category
        }
      }} 
      series={[{
        name: 'price',
        data: data
      }]} type="line" width={800} height={500} />
    </div>
  )
}
