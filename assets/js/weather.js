import { groupByDay } from './groupbyday.js';

export async function getWeather() {
    let city = document.getElementById('cityInput').value;
    let country = document.getElementById('countryInput').value;

    try {
        const apiKeyOW = '5683e9929dbb6b31b7fc841e9f3401a0';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKeyOW}`;
        const response = await fetch(url);
        const data = await response.json();

        const forecasts = data.list;
        const dailyForecasts = groupByDay(forecasts);

        const forecastLimit = 5;
        let forecastCount = 0;

        const cityName = data.city.name;
        const apiKeyU = 'o2oQlKeePYHEBrcQB0ZCi7DFeRn5-yAHix1lWoL_UoA';
        const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&orientation=landscape&per_page=1&client_id=${apiKeyU}`);

        const unsplashData = await unsplashResponse.json();

        const photoUrl = unsplashData.results[0].urls.regular;
        const photoElement = document.getElementById('photo1');
        photoElement.src = photoUrl;
        photoElement.alt = cityName;

        const cityTitle = document.createElement('h2');
        cityTitle.textContent = cityName;
        document.getElementById('forecasts').innerHTML = '';
        document.getElementById('forecasts').insertBefore(cityTitle, document.getElementById('output'));

        let forecastListHTML = '';

        dailyForecasts.forEach((forecast) => {
            if (forecastCount < forecastLimit) {
                const dateText = forecast[0].dt_txt.split(' ')[0];
                const dateParts = dateText.split('-');
                const year = dateParts[0];
                const month = new Date(dateText + 'T00:00:00').toLocaleString('default', { month: 'long' });
                const day = dateParts[2];
                const formattedDate = day + ' ' + month + ' ' + year;
                const temperature = Math.round(forecast[0].main.temp - 273.15);
                const feelsLike = Math.round(forecast[0].main.feels_like - 273.15);
                const weatherIconCode = forecast[0].weather[0].icon;
                const weatherIconUrl = getWeatherIconUrl(weatherIconCode);
                const description = forecast[0].weather[0].description;

                forecastListHTML += `
          <ul>
            <li>${formattedDate}</li>
            <li>Temperature: ${temperature.toFixed(0)}°C</li>
            <li>Feels like: ${feelsLike.toFixed(0)}°C</li>
            <li>${description}</li>
            <li><img src="${weatherIconUrl}" alt="Weather icon"></li>
          </ul>
        `;

                forecastCount++;
            }
        });

        document.getElementById('forecasts').innerHTML += forecastListHTML;
    } catch (error) {
        console.log('An error has occurred', error);
    }
}

function getWeatherIconUrl(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `${iconBaseUrl}${iconCode}${iconSize}`;
}