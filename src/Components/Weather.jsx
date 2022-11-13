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
  const icon = weather.weather?.[0].icon;

  return (
    <div className='card' style={{backgroundImage: 
      icon === '01d' ? `url('https://c.tenor.com/1IGg-nKS4v8AAAAC/diablo-llorando.gif')` :
      icon === '02d' ? `url('https://media.istockphoto.com/photos/deep-blue-view-on-a-lightly-clouded-day-picture-id171225633?k=20&m=171225633&s=612x612&w=0&h=WeWgAr8ozXR2KXGMpv6awDpwwzkDm7w3V117qE2hN1k=')` :
      icon === '03d' ? `url('https://live.staticflickr.com/1828/28636482297_bd428f26e8_b.jpg')` :
      icon === '04d' ? `url('https://c4.wallpaperflare.com/wallpaper/994/701/91/broken-heart-shaped-cloud-wallpaper-preview.jpg')` :
      icon === '09d' ? `url('https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/rain-drops-on-window-1827098_1920.jpg?strip=1')` :
      icon === '10d' ? `url('https://calibbr.com/wp-content/uploads/2022/06/Our-Favorite-Top-18-Rainy-Day-Movies.jpg')` :
      icon === '11d' ? `url('https://cdn-res.keymedia.com/cms/images/us/069/0305_637894916043921413.jpg')` :
      icon === '13d' ? `url('https://www.surreynowleader.com/wp-content/uploads/2020/01/20116793_web1_vancouver-snow-jan13.jpeg')` :
      icon === '50d' ? `url('https://www.romagnanotizie.net/photogallery_new/images/2019/11/nebbia-161017.660x368.jpg')` :
    
      icon === '01n' ? `url('https://images.unsplash.com/photo-1511909022865-a30191182d6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBhdCUyMG5pZ2h0fGVufDB8fDB8fA%3D%3D&w=1000&q=80')` :
      icon === '02n' ? `url('https://s7d2.scene7.com/is/image/TWCNews/cloudy_night_png-4')` :
      icon === '03n' ? `url('https://static.vecteezy.com/system/resources/thumbnails/001/625/795/original/lightning-storm-time-lapse-free-video.jpg')` :
      icon === '04n' ? `url('https://live.staticflickr.com/5758/22448249491_e3e9ddcddf_b.jpg')` :
      icon === '09n' ? `url('https://themepack.me/i/c/749x467/media/g/2227/rainy-city-night-theme-ac2.jpg')` :
      icon === '10n' ? `url('https://images.pexels.com/photos/10161198/pexels-photo-10161198.jpeg?cs=srgb&dl=pexels-yura-forrat-10161198.jpg&fm=jpg')` :
      icon === '11n' ? `url('https://earthsky.org/upl/2012/05/thunderstorm2_h-e1438002382746.jpeg')` :
      icon === '13n' ? `url('https://w0.peakpx.com/wallpaper/693/564/HD-wallpaper-empty-snowy-road-at-night.jpg')` :
      icon === '50n' ? `url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9969422191617.563131a9e0852.jpg')` :
    'none'}}>
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
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
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