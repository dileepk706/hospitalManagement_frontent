import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
    labels: string[],
    datasets: Datasets,
}

type Datasets = {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number,
}
const DoughnutChart: React.FC<DoughnutChartProps> = ({ datasets, labels, }) => {

    const data = {
        labels: labels,
        datasets: [datasets],
    };
    const options = {}
    return (

            <Doughnut
                data={data}
                options={options}
            >

            </Doughnut>

    )
}
export default DoughnutChart

// const data = {
//     labels: ['Male', 'Female'],
//     datasets: [
//       {
//         label: '100 of Patients',
//         data: [30, 20],
//         backgroundColor: [
//           'rgba(79, 184, 254, 0.2)',
//           'rgba(54, 236, 194, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };