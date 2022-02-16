import { useEffect, useState } from "react"
import getData from "./api"
import Cards from "./components/Cards"
import Charts from "./components/Chart"
import CountryPicker from "./components/CountryPicker"

import './index.css'

function App() {
    const [state,setState] = useState([])
    const [country,setCountry] = useState('')

    useEffect(()=>{
        async function fetchData(){
            let data = await getData(country)
            setState(data)
        }
        fetchData()
    },[country])
    return (
        <div className="container">
            <Cards countryData={state}/>
            <CountryPicker handelChange={(e)=>setCountry(e.target.value)} />
            <Charts countryData={state} country={country} />
        </div>
    )
}

export default App
