async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        resultDiv.innerHTML = 'Please enter a city name.';
        return;
    }

    try {
        const res = await fetch(`/weather?city=${city}`);
        const data = await res.json();

        if (data.error) {
            resultDiv.innerHTML = data.error;
            return;
        }

        resultDiv.innerHTML = `
            <h2>${data.city}</h2>
            <p><strong>${data.temperature}°C</strong></p>
            <p>${data.weather} - ${data.description}</p>
            <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon" />
        `;
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data.';
    }
}
