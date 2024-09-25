import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const [searchval, setSearchval] = useState('india');
  
  const fetchdata = async () => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${searchval}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
        if(response.ok){
          const result = await response.json();
          setData(result);
        }
      
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [searchval]);


  const inputhandle = (event) => {
    setInput(event.target.value);
  }

  const searchhandle = () => {
    if(input.trim()!==''){
      setSearchval(input);
      setInput('');
    }
  }
console.log(apiKey);
  return (
    <>
     {data?(
       <div className="container">
       <div className="box">
         <div className="search">
           <input type="text" name="" id="" value={input} onChange={inputhandle} placeholder='Search'/>
           <button onClick={searchhandle}>
             <i className="bi bi-search"></i>
           </button>
         </div>
         <div className="img">
           <img src={data.current.condition.icon} alt="" />
         </div>
         <div className="temp">
           <h1>{data.current.temp_c}<sup>o</sup>C</h1>
           <p>{data.location.name}</p>
         </div>

         <div className="foot">
           <div className="left">
             <h3>{data.current.humidity}%</h3>
             <p>Humidity</p>
           </div>
           <div className="right">
             <h3>{data.current.wind_kph} km/h</h3>
             <p>Wind Speed</p>
           </div>
         </div>
       </div>
     </div>
     ):
     (
      <h1>Loading...</h1>
     )
     }
    </>
  )
}

export default App
