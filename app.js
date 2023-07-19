const apiKey = '42149af457121306655e8391fcb323e9';

//seleziono tutti gli elementi del dom
const weatherIcon = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

//chiamo le Api con Axios

async function getWeatherData(cityName) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const weatherData = response.data;
// estraggo i dati dalle api e le metto uguali a variabili
    const iconCode = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;
    const city = weatherData.name;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    // modifico gli elementi del dom in modo che cambino dinamicamente

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    temperatureElement.textContent = `${Math.round(temperature)}°C`;
    cityElement.textContent = city;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${windSpeed} km/h`;
  } catch (error) {
    console.error('Errore durante la chiamata API:', error);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const cityInput = document.querySelector('input[type="text"]');
  const cityName = cityInput.value;

  getWeatherData(cityName);

  cityInput.value = '';
}

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', handleFormSubmit);
