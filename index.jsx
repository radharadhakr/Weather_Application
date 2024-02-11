import { useContext,createContext ,useEffect,useState } from "react";
import axios from "axios";

const StateContext =createContext();

export const StateContextProvider = ({children}) =>{
    const [weather , setWeather] = useState({})
    const [values,setValues] = useState([])
    const [place,setPlace] = useState('Bhubaneshwar')
    const [thisLocation , setLocation] = useState('')

    const fetchWeather = async() => {
        const options = {
            method : 'GET',
            url : 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params : {
                aggregateHours : '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames : 0,

            },

            headers: {
                'X-RapidAPI-Key': '2be1eb4e63msh88e71eb9b83bfb4p10c651jsn92cafc655c7c',
              'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }
        try{
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values);
            setWeather(thisData.values[0])

        }
        catch(e){
            console.error(e);
            alert('This Place does not Exist');
        }
    }
    useEffect(()=>{
         fetchWeather()

    },[place])

    useEffect(()=>{
        console.log(values)

    },[values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place

        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);