import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function Pie_Chart({data,category}) {
  
  return (

       
        <div className='card'>
            <Chart 
        options={{
          chart: {
            width: 380
          },
          labels: category,
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
      series={data} 
      type="pie" width={500} height={500} />
        </div>
    
  )
}
