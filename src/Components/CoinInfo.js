import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
// import Chart from 'react-apexcharts';

import {
  LineChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// import faker from 'faker';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';



// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };
// import { Line } from 'react-chartjs-2';





const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  // const fetchHistoricData = async () => {
  //   const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
  //   setHistoricData(data.prices);
  // };

 

  // const currdate = historicData.map(coin=>{
  //   let date = new Date(coin[0]);
  //   let time = date.getHours()>12 
  //       ? `${date.getHours()-12}: ${date.getMinutes()} PM`
  //       : `${date.getHours()}: ${date.getMinutes()} AM`;
  //   return days === 1 ? time : date.toLocaleDateString()
  // })

  //console.log(historicData);
  // const data = {
  //   options: {
  //     colors: ["#E91E63", "#FF9800"],
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: currdate
  //       // [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //     },
  //   },
  //   series: [
  //     {
  //       name: "People Born",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91],
  //     },
  //     {
  //       name: "People Died",
  //       data: [3, 60, 35, 80, 49, 70, 20, 81],
  //     },
  //   ],
  // }
  
  const fetchData= async () => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=121`
        // `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&market_data=true`
      ),
    ]);

    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-us");
      return {
        Date: date,
        Price: p,
      };
    });
    useEffect(() => {
      fetchData();
    });
    console.log(graphData);
   // console.log(graphRes);
  }

  return (
    <div className="coin-info-container">
      
      
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData} margin={{ right: 300 }}>
        <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="student"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="fees"
                        stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
          {/* <AreaChart
            data={graphData}
            width={500}
            height={400}
            margin={{
              top: 10,
              right: 40,
              left: 0,
              bottom: 0,
            }}
          > */}
            {/* <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart> */}
        </ResponsiveContainer>
        
      </div>
    
    // <div className="chart">
    //   <div className="container">


    //   {/* <Line options={options} data={data} />; */}
    //     {/* <Line
    //         data= {{
    //           labels: historicData.map(coin=>{
    //             let date = new Date(coin[0]);
    //             let time = date.getHours()>12 
    //                 ? `${date.getHours()-12}: ${date.getMinutes()} PM`
    //                 : `${date.getHours()}: ${date.getMinutes()} AM`;
    //             return days === 1 ? time : date.toLocaleDateString()
    //           }),
    //           datasets:[
    //             {
    //             data: historicData.map((coin)=>coin[1]),
    //             label: `Price (Past ${days} Days ) in ${currency}`,
    //             borderColor: "#EEBC1D",
    //           },
    //         ]
    //         }}
    //       /> */}
    //       {/* <Chart
    //         options={data.options}
    //         series={data.series}
    //         type="line"
    //         width="750"
    //       /> */}
          
         
    //       <ResponsiveContainer width="100%" height={400}>
    //         <AreaChart
    //           data={graphData}
    //           width={500}
    //           height={400}
    //           margin={{
    //             top: 10,
    //             right: 40,
    //             left: 0,
    //             bottom: 0,
    //           }}
    //         >
    //           <CartesianGrid strokeDasharray="3 3" />
    //           <XAxis dataKey="Date" />
    //           <YAxis />
    //           <Tooltip />
    //           <Area
    //             type="monotone"
    //             dataKey="Price"
    //             stroke="#8884d8"
    //             fill="#8884d8"
    //           />
    //         </AreaChart>
    //       </ResponsiveContainer>
    //     </div>
      

    //   {/* <style jsx= 'true'>{`
    //     @media screen and (min-width: 768px) {
    //       .container {
    //         width: 75%;
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         justify-content: center;
    //         margin-top: 25px;
    //         padding: 40px;
    //       }
    //     }
    //     .container {
    //       width: 100%;
    //       margin-top: 0;
    //       padding: 20px;
    //       padding-top: 0;
    //     }
    //   `}</style> */}
      
    // </div>
    
  );
}


export default CoinInfo;
