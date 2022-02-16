const URL = 'https://api.covid19api.com'

const getData = async(country = '')=>{
    try{
        const response = await fetch(URL + '/summary')
        const data = await response.json()
        //Global
        if(!country){
            const {TotalConfirmed,TotalDeaths,TotalRecovered,Date : date} = data.Global
            return {TotalConfirmed,TotalDeaths,TotalRecovered,date}
        }
        else{
            let info = {}
            const {Countries }= data
            Countries.forEach(({Country,TotalConfirmed,TotalDeaths,Date})=>{
                if(country === Country) info =  {TotalConfirmed,TotalDeaths,Date,Country}
            })
            return info
        }
    }
    catch(err){
        return 
    }
}

export const getDaily = async()=>{
    try{
        const response = await fetch(URL + '/world')
        const data = await response.json()
        return data
    }
    catch(err){
        return 
    }
}

// return names of country
export const getCountries = async()=>{
    try{
        const response = await fetch(URL + '/countries')
        const data = await response.json()
        return data
    }
    catch(err){
        return 
    }
}



export default getData