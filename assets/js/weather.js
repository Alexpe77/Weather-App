import { groupByDay } from './groupbyday.js';

export async function getWeather() {
    let city = document.getElementById('cityInput').value;
    let country = document.getElementById('countryInput').value;

    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&appid=5683e9929dbb6b31b7fc841e9f3401a0');
        const data = await response.json();

        const forecasts = data.list;
        const dailyForecasts = groupByDay(forecasts);

        const forecastLimit = 5;
        let forecastCount = 0;

        const cityName = data.city.name;
        const cityTitle = document.createElement('h2');
        cityTitle.textContent = cityName;
        document.getElementById('forecasts').insertBefore(cityTitle, document.getElementById('output'));

        dailyForecasts.forEach((forecast) => {
            if (forecastCount < forecastLimit) {
    
                const dateText = forecast[0].dt_txt.split(' ')[0];
                const dateParts = dateText.split('-');
                const year = dateParts[0];
                const month = new Date(dateText + 'T00:00:00').toLocaleString('default', { month: 'long' });
                const day = dateParts[2];

                const formattedDate = day + ' ' + month + ' ' + year;
                const temperature = Math.round(forecast.reduce((acc, cur) => acc + cur.main.temp, 0) / forecast.length) - 273.15;

                const listItem = document.createElement('li');

                const dateElement = document.createElement('div');
                dateElement.textContent = formattedDate;
                listItem.appendChild(dateElement);

                const temperatureElement = document.createElement('div');
                temperatureElement.textContent = temperature.toFixed(0) + '°C';
                listItem.appendChild(temperatureElement);

                const descriptionElement = document.createElement('div');
                descriptionElement.textContent = forecast[0].weather[0].description;
                listItem.appendChild(descriptionElement);

                document.getElementById('forecasts').appendChild(listItem);
            }
        });
    }
    catch (error) {
        console.log('An error as occured', error);
    }
}