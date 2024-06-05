import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Pie_Chart from "./Pie_Chart";
import "./dashboard.css"

export default function Dashboard_Page3() {
  const [shopping_data, setshopping_data] = useState([]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  const age = [];
  const salary = [];
  var result = [];
  //get api data
  const get_shopping_data = () => {
    try {
      axios.get("https://dummyjson.com/products").then((response) => {
        const allapiData=response.data.products
          
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
          console.log(result)
      });
    } catch (error) {
      console.log(console.error());
    }
  };

  useEffect(() => {
    get_shopping_data();
  }, []);

  return (
    <div className="container-fluid p-2">
      <h5>Admin Dashboard 3</h5>
     
            
              
           <div className="d-flex flex-wrap chart_card">
           <div className="card">
           <Chart
              options={{
                chart: {
                  id: "apexchart-example",
                },
                dataLabels: {
                  enabled: false,
                },

                xaxis: {
                  categories: category,
                },
              }}
              series={[
                {
                  name: "price",
                  data: data,
                },
              ]}
              type="area"
              width={700}
              height={500}
            />
           </div>
            
            <Pie_Chart category={category} data={data} />
            
           </div>
              
            
     
    </div>
  );
}
