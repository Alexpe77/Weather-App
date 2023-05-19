import { getWeather } from './weather.js'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getWeatherBtn').addEventListener('click', getWeather);
});
