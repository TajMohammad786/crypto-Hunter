import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
import { CryptoState } from '../CryptoContext';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

const CoinsData = ({coin}) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(300);
    const { currency } = CryptoState();
    const fetchHistoricData = async () => {
        const [graphRes, dataRes] = await Promise.all([
            await axios.get(HistoricalChart(coin.id, days, currency))
        ])
        setHistoricData(graphRes.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString();
            // let time = date.getHours()>12 
            //             ?`${date.getHours()-12}:${date.getMinutes()} PM`
            //             :`${date.getHours()}:${date.getMinutes()} AM`
            // if(days === 1){
            //     return {
            //         Date: time,
            //         Price: p,
            //     }
            // }
            // else{
            //     return {
            //         Date: date.toLocaleDateString("en-us"),
            //         Price: p,
            //     }
            // }
            return {
              Date: date,
              Price: p,
            };

        }))
    };
    console.log(historicData)
    
      
      useEffect(() => {
        fetchHistoricData();
      }, [currency, days]);
  return (
    
      <div className="coin-info-container" style={{
        width:'70%', 
        marginLeft:"3%",
        marginRight: "3%",
        marginTop: "5%"
        }}>
      
      
      <ResponsiveContainer width="100%" height={400}>
        
        <AreaChart
          data={historicData}
          width={500}
          height={400}
          margin={{
            right: 0,
            left: 0, 
            bottom: 0,
          }}
        >
           <Legend /> 
         
          <XAxis dataKey="Date" />
          <YAxis  />
          
          <Area
            type="linear"
            dataKey="Price"
            
            stroke="#EEBC1D"
            strokeWidth={2}
            fill="black"
          />
          
        <Tooltip contentStyle={{color:"white", background:"black"}}/>
        </AreaChart>
        
      </ResponsiveContainer>
      <div style={{display:"flex", marginTop: 20, justifyContent: "space-around", width: "100%"}}>
        {chartDays.map((day)=>(
          <SelectButton
          key={day.value}
          onClick={()=> setDays(day.value)}
          selected={day.value === days}
          >{day.label}</SelectButton>
        ))}
      </div>
      
    </div>
  
    
  )
}

export default CoinsData
