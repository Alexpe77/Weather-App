import { getWeather } from './weather.js'
import { clearResult } from './clearResult.js'

const clearResultBtn = document.getElementById('clearResultBtn');
clearResultBtn.addEventListener('click', clearResult);
document.getElementById('getWeatherBtn').addEventListener('click', getWeather);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  });