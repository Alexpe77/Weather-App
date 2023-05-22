import { getWeather } from './weather.js'

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  });