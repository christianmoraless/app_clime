import { useState } from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import {WHEATHER_API_URL, WHEATHER_API_KEY} from './utils/api';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    
    const [lat,lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WHEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WHEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WHEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WHEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const wheaterResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...wheaterResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err))
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
