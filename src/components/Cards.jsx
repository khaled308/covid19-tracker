import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CountUp from "react-countup"
import getData from "../api.js"
import { useEffect, useState } from "react"


function Cards({countryData}) {
  const[summaryData,setSummaryData] = useState(null)
    useEffect(()=>{
        async function fetchSummaryData(){
            const data = await getData()
            setSummaryData(data)
        }
        fetchSummaryData()
    }
    ,[])
  const CardStyle = {
    margin : '0 2%'
  }
  if(summaryData){
    let {TotalConfirmed, TotalDeaths,date} = summaryData
    if(countryData) ({TotalConfirmed, TotalDeaths,date} = countryData)
    
    return (
      <Grid spacing={3} container justifyContent={'center'} className='cards-container'>
        
        <Grid item component={Card} xs={12} md={3} className='card infected' sx={CardStyle}>
          <CardContent>
            <Typography gutterBottom color='textSecondary'>Infected</Typography>
            <Typography variant='h5'>
              <CountUp
                start={0}
                end={TotalConfirmed}
                duration={2.5}
                separator=','
              />
            </Typography>
            <Typography color='textSecondary'>{new Date(date).toDateString()}</Typography>
            <Typography variant='body2'>Number of active cases of COVID-19</Typography>
          </CardContent>
        </Grid>
  
  
        <Grid item component={Card} xs={12} md={3} className='card death' sx={CardStyle}>
          <CardContent>
            <Typography gutterBottom color='textSecondary'>Death</Typography>
            <Typography variant='h5'>
            <CountUp
                start={0}
                end={TotalDeaths}
                duration={2.5}
                separator=','
              />
              </Typography>
            <Typography color='textSecondary'>{new Date(date).toDateString()}</Typography>
            <Typography variant='body2'>Number of active death of COVID-19</Typography>
          </CardContent>
        </Grid>
  
      </Grid>
    )
  }
  else{
    return <p>loading...</p>
  }
}


export default Cards