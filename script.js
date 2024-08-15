// script.js
const apiKey = 'bb232205dd3927866801a6e2f698f57d'; // Updated API key
const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');

submitBtn.addEventListener('click', () => {
    const location = cityInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API request failed');
            }
            return response.json();
        })
        .then(data => {
            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIcon.alt = data.weather[0].description;
            errorMessage.textContent = ''; // Clear previous error messages
            document.querySelector('.weather-info').style.display = 'block'; // Show weather info
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorMessage.textContent = 'Unable to fetch weather data. Please check the city name and try again.';
            document.querySelector('.weather-info').style.display = 'none'; // Hide weather info
        });
}
