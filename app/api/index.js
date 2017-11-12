var axios = require('axios');
require('../../secret.js');

export const api_key = process.env.WEATHER_API_KEY;

export const fetchWeatherByCityName = (city, metric, country) => {
    if (!country) {
        country = '';
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`;
    if (metric) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${api_key}`;
    }
    console.log('url: ', url)
    return axios.get(url)
    .then(res => res.data)
}

export const fetchWeatherByCoords = (lat, lon, metric) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    if (metric) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    }
    console.log('coords url: ', url)
    return axios.get(url)
    .then(res => res.data)
}

// fetchWeatherByCityName('NewYork', true)
