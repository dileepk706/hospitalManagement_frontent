import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement } from 'chart.js';
import React from 'react';

import { Doughnut,Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement );
 
type BarChartProps={
    labels:string[]
    dataset:dataset
}
type dataset = {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number,
}

 const BarChart:React.FC<BarChartProps>=({dataset,labels})=> {
 
    const dataForbar = {
      labels: labels,
      datasets: [dataset],
    };

    const options={}
  return (
     
        <Bar
          data={dataForbar}
          options={options}
        >

        </Bar>
      
  )
}
export default BarChart

