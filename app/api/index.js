var axios = require('axios');
require('../../secret.js');

export const api_key = process.env.WEATHER_API_KEY;

export const fetchWeatherByCityName = (city, metric) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
    if (metric) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`
    }
    console.log('url: ', url)
    return axios.get(url)
    .then(res => res.data)
}

// fetchWeatherByCityName('NewYork', true)