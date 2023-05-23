import { getWeather } from './weather.js'
import { clearResult } from './clearResult.js'

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  });

  document.getElementById('clearResultBtn').addEventListener('click', clearResult);