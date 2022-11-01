import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = () => {

  const [ weather,setWeather ] = useState({});
  const [ isCelsius, setIsCelsius ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=118576317ecc4c86d110c56bc71e4732`)
        .then(res => {
          setIsLoading(false)
          setWeather(res.data)
        });
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])
  // console.log(weather);

  const weatherInCelsius = Math.round(weather.main?.temp - 273.15);
  const weatherInFahrenheit = Math.round(weatherInCelsius * 9/5 + 32);
  const thermalSensation = Math.round(weather.main?.feels_like - 273.15);
  const sensationInFahrenheit = Math.round(thermalSensation * 9/5 + 32);

  return (
    <div className='card'>
      {
        isLoading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            <div className="main-info">
              <h1>{weather.name}, {weather.sys?.country}.</h1>
              <h2>{isCelsius ? weatherInCelsius : weatherInFahrenheit} {isCelsius ? '°C' : '°F'}</h2>
              <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
              <h2>{weather.weather?.[0].description}</h2>
            </div>
            <div className="additional-info">
              <h3><i className="fa-solid fa-wind"></i> wind speed: {Math.round(weather.wind?.speed * 3.6)} km/h</h3>
              <h3><i className="fa-solid fa-droplet"></i> humidity: {weather.main?.humidity}%</h3>
              <h3><i className="fa-solid fa-temperature-half"></i> thermal sensation: {' '} 
              {isCelsius ? thermalSensation : sensationInFahrenheit} {isCelsius ? '°C' : '°F'}</h3>
              <button onClick={() => setIsCelsius(!isCelsius)}>
              {isCelsius ? 'switch to Fahrenheit' : 'switch to Celsius'}</button>
            </div>
          </>
        )
      }      
    </div>
  );
};

export default Weather;