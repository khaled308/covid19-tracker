import { FormControl, NativeSelect } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCountries } from '../api';

function CountryPicker({handelChange}) {
    const[countries,setCountries] = useState(null)
    useEffect(()=>{
        async function fetchData(){
            const data = await getCountries()
            setCountries(data)
        }

        fetchData()
    },[])
    if(countries){
        return (
            <FormControl className='form-control'>
                <NativeSelect onChange={handelChange}>
                    {
                        countries.map(({Country,ISO2})=><option key={ISO2} value={Country}>{Country}</option>)
                    }
                </NativeSelect>
            </FormControl>
        )
    }
    return <p>Loading...</p>
}

export default CountryPicker