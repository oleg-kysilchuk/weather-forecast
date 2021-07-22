import '../styles/style.scss';

const APIKEY = '7eff271b45954de50f23ce0e9f1da0a5';
const form = document.getElementById('search-form');
const input = document.getElementById('search');
const info = document.querySelector('.info');
const today = document.querySelector('.today');
const forecast = document.querySelector('.forecast');



function showForecast(forecastData) {
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    
    let daily = forecastData.daily;
    let i;
    let length = daily.length;

    forecast.innerHTML = '';
    
    for (i = 1; i <= length -1; i++) {
        let div = document.createElement('div');
        div.classList.add('forecast-item');

        let dayInfo = document.createElement('p');
        dayInfo.classList.add('forecast-day');

        let date = new Date(daily[i].dt *1000);
        let day = days[date.getDay()];
        dayInfo.innerText = day;
        div.appendChild(dayInfo); 

        let ico = document.createElement('img');
        ico.classList.add('forecast-icon');
        ico.setAttribute('src', `https://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`);
        div.appendChild(ico);

        let tempInfo = document.createElement('p');
        tempInfo.classList.add('forecast-temp');
        tempInfo.innerText = `${(daily[i].temp.day).toFixed(0)}°/${(daily[i].temp.night).toFixed(0)}°`;
        div.appendChild(tempInfo);

        forecast.appendChild(div);
    }
}

function getForecast(lat, lon) {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIKEY}&units=metric`)
            .then(response => response.json())
            .then(data => showForecast(data))
    } catch (error) {
        console.log(error);
    }
}


function showWeather(cityWeather) {

    today.innerHTML = 
    `<div class="icon"><img src="https://openweathermap.org/img/w/${cityWeather.weather[0].icon}.png" alt="icon"/></div>
    <div>
        <p class="temp">${Math.round(cityWeather.main.temp)} °C</p>
        <p class="description">${cityWeather.weather[0].main}</p>
    </div>

    <div>
        <span>Humidity: ${cityWeather.main.humidity}%</span>
        <span>Wind: ${Math.round(cityWeather.wind.speed)} km/h</span>
        <span>Pressure: ${Math.round(cityWeather.main.pressure * 100 / 133)}mm Hg</span>
    </div>
    <div>
        <span>${cityWeather.name}, ${cityWeather.sys.country}</span>
        <span>Max: ${Math.round(cityWeather.main.temp_max)}°C</span>
        <span>Min: ${Math.round(cityWeather.main.temp_min)}°C</span>
    </div>`

    let lat = cityWeather.coord.lat;
    let lon = cityWeather.coord.lon;
    getForecast(lat, lon);
}


function getWeather(city) {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
            .then(response => response.json())
            .then(data => showWeather(data));   
    } catch (error) {
        console.log(error);
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputValue = input.value;
    getWeather(inputValue);
});

