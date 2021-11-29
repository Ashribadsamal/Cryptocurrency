import { CircularProgress, createTheme,makeStyles,ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
//import { Classnames } from 'react-alice-carousel'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
//import {  Line } from "react-chartjs-2"
import { Line,Chart} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { chartDays } from '../data'
import SelectButton from './SelectButton'
//import 'chartjs-plugin-streaming';

// import {Chart} from 'chart.js'

// Chart.register(Line)

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function CoinInfo({coin}) {
    const [historicData,setHistoricData] = useState()
    const [day,setDays] = useState(1)

    const {currency} = CryptoState()

    const fetchHistoricData = async()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,day,currency))
        setHistoricData(data.prices)
    }
console.log(historicData)
    useEffect(()=>{
        fetchHistoricData()
    },[currency, day])

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: '#fff',
            },
            type: "dark"
        },
    });

    const useStyles = makeStyles((theme)=>({
        container:{
            width: "75%",
            display:"flex",
            flexDirection:"column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]:{
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },

        }
    }))
    const classes = useStyles()

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicData ? (
                        <CircularProgress
                        style={{color: "gold"}}
                        size = {250}
                        thickness={1}
                        />
                    ):(
                        <>
                       
                       <Line
                        data={{
                        
                            labels: historicData.map((coin)=>{
                                let date = new Date(coin[0]); 
                                let time = date.getHours() > 12 ? `${date.getHours()-12}:${date.getMinutes()}PM`:`${date.getHours()}:${date.getMinutes()}AM`;
                                return day === 1 ? time:date.toLocaleDateString()
                            }),
                            datasets:[
                                {
                                    data: historicData.map((coin)=> coin[1]),
                                    label: `Price (Past ${day} Days) in ${currency}`,
                                    borderColor: "#EEBC1D"
                                }
                                ],

                        }}
                                                options={{
                                                elements:{
                                                    point:{
                                                        radius: 1,
                            }
                        }
                        }}
                        />
                          <div
                          style={{
                              display: "flex",
                              marginTop: 20,
                              justifyContent: "space-around",
                              width: "100%"
                          }}
                          >
                              {chartDays.map(days =>(
                                  <SelectButton
                                  key={days.value}
                                  onClick={()=>setDays(days.value)}
                                    selected={days.value === day}
                                  >
                                      {days.label}
                                    </SelectButton>
                              ))}
                          </div>
                        </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo

