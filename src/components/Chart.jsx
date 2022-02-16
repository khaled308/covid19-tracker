import React, { useEffect, useState } from 'react'
import {Line, Bar} from 'react-chartjs-2'
import { getDaily } from '../api'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    registerables
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

ChartJS.register(...registerables)
function Charts({countryData,country}) {
    const [data,setData] = useState([])
    useEffect(()=>{
        async function fetchDaily(){
            const covidData = await getDaily()
            setData(covidData)

        }
        fetchDaily()
    }
    ,[])
    const lineChart = 
        data.length > 0 ? 
        (<Line
            data={{
                labels : data.map(item=>new Date(item.Date).toDateString()),
                datasets : [{
                    data : data.map(({TotalConfirmed})=>TotalConfirmed),
                    label : 'Infected',
                    borderColor : '#333ff',
                    fill : true
                },
                {
                    data : data.map(({TotalDeaths})=>TotalDeaths),
                    label : 'Death',
                    borderColor : 'red',
                    fill : true
                }
            ]
            }}
        />) : null

    const barChart = 
        country ?(
                <Bar
                    data={{
                        labels:['Infectd', 'Death'],
                        datasets : [{
                            label : 'people',
                            backgroundColor: [
                                'rgba(0, 0, 255,.5)',
                                'rgba(255, 0, 0,.5)'
                            ],
                            data:[countryData.TotalConfirmed,countryData.TotalDeaths]
                        }]
                    }}
                    options={{
                        legend : {display:false},
                        title : {display : true , text:`Current state in ${country}`}
                    }}
                />
            ):null
    return (
        <div className="container">
            { country ? barChart : lineChart} 
        </div>
    )
}

export default Charts