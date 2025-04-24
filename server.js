const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Insert your OpenWeatherMap API key here
const API_KEY = '26fb15819584e3c5307aa71f5315117c';

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            return res.status(404).json({ error: 'City not found' });
        }

        res.json({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
