import { groupByDay } from './groupbyday.js';

async function fetchCityOptions(city) {

    const username = 'alexpe77';

    const url = `http://api.geonames.org/searchJSON?q=${city}&username=${username}&style=SHORT`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error has occured with GeoNames API.');
        }
    
        const data = await response.json();
        if (!data.geonames) {
          throw new Error('The response of the GeoNamesApi does not contain requested data.');
        }
    
        const cityOptions = data.geonames.map((result) => result.name);
        return cityOptions;
      } catch (error) {
        console.log('An error has occured while catching city options :', error);
        return [];
      }
}

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

        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');

        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo');
        const photoElement = document.createElement('img');
        photoElement.classList.add('photo');
        photoElement.src = photoUrl;
        photoElement.alt = cityName;
        photoContainer.appendChild(photoElement);

        const forecastsContainer = document.createElement('div');
        forecastsContainer.classList.add('forecasts-container');
        const cityTitle = document.createElement('h2');
        cityTitle.classList.add('city-title');
        cityTitle.textContent = cityName;
        forecastsContainer.appendChild(cityTitle);

        const cityInput = document.getElementById('cityInput');
        const datalist = document.createElement('datalist');
        datalist.id = 'cityOptions';
        cityInput.setAttribute('list', 'cityOptions');
        cityInput.parentNode.insertBefore(datalist, cityInput.nextSibling);

        cityInput.addEventListener('input', async function() {
            const options = await fetchCityOptions(this.value);
            datalist.innerHTML = '';

            options.forEach((option) => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                datalist.appendChild(optionElement);
            });
        });

        const forecastList = document.createElement('ul');
        forecastList.classList.add('forecasts');
        forecastsContainer.appendChild(forecastList);

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
                const descriptionElement = document.createElement('li');
                descriptionElement.textContent = description;
                descriptionElement.classList.add('weatherDescription');

                const forecastItem = document.createElement('li');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
    
                        <div class="forecast-date">${formattedDate}</div>
                        <div class="forecast-temperature">Actual temperature: ${temperature.toFixed(0)}°C</div>
                        <div class="forecast-feels-like">Feels like: ${feelsLike.toFixed(0)}°C</div>
                        <div class="forecast-description">${descriptionElement.outerHTML}</div>
                        <div class="forecast-icon"><img src="${weatherIconUrl}" alt="Weather icon"></div>
                
                    `;
                forecastList.appendChild(forecastItem);
                forecastCount++;
            }
        });

        searchContainer.appendChild(photoContainer);
        searchContainer.appendChild(forecastsContainer);

        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.appendChild(searchContainer);

    } catch (error) {
        console.log('An error has occurred', error);
    }
}

function getWeatherIconUrl(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `${iconBaseUrl}${iconCode}${iconSize}`;
}