import Chart from 'react-apexcharts'
import { useState } from 'react';

export default function SampleLine() {

    const [series, setseries] = useState([
        {
            name: "Temperature in Fahrenheit", //will be displayed on the y-axis
            data: [43, 53, 50, 57]
          }
    ])
   
    const [options, setoptions] = useState(
        
        { colors : ['#be2596'],
        chart: {
            id: "simple-bar"
          },
          xaxis: {
            categories: [1, 2, 3, 4] //will be displayed on the x-asis
          }}
    )
    
    return (
      <div>
        <Chart  options={options} type="bar" series={series} width="50%" />
      </div>
    );
  }