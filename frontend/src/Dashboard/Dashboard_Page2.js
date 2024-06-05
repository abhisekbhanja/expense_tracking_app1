import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function Dashboard_Page2() {
  
  const [shopping_data, setshopping_data] = useState([])
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])

  const age = [];
  const salary = [];
  //get api data
  const get_shopping_data=()=>
  {
      try {
        // axios.get("https://dummyjson.com/products").then(response =>{
        //   console.log("response", response.data.products)
        //   response.data.products.map(item => {
        //    // console.log("item", item.brand)
        //       age.push(item.price);
        //       salary.push(item.category)
        //   })
        //   setCategory(salary)
        //   setData(age)

        ///////////////////////

        axios.get("https://dummyjson.com/products").then(response =>{
          //console.log("response", response.data.products)
          const allapiData=response.data.products
          var result = [];
          allapiData.reduce(function(res, value) {
            if (!res[value.brand]) {
              res[value.brand] = { brand: value.brand, price: 0 };
              result.push(res[value.brand])
            }
            res[value.brand].price += value.price;
           
            return res;
          }, []);

          result.map(item=>{
            //console.log(item.brand);
            age.push(item.price);
            salary.push(item.brand)
          })
          setCategory(salary)
          setData(age)
          //console.log(result)

        /////////////////////////
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
        <h5>Admin Dashboard 2</h5>
        <Chart options={{
        chart: {
          id: 'apexchart-example'
        },colors:'#9C27B0',
        xaxis: {
          categories: category
        }
      }} 
      series={[{
        name: 'price',
        data: data
      }]} type="bar" width={900} height={500} />
    </div>
  )
}
