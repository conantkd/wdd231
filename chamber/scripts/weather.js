const apiKey = '2d0cca96f48b4783ded8bfd8a4fc5050';
const lat = 6.2442;
const lon = -75.5812;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentWeatherContainer = document.querySelector('#current-weather');
const forecastContainer = document.querySelector('#weather-forecast');

async function getWeatherData() {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (currentResponse.ok) {
      const currentData = await currentResponse.json();
      displayCurrentWeather(currentData);
    }

    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    }
  } catch (error) {
    console.error(error);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);
  const humidity = data.main.humidity;

  currentWeatherContainer.innerHTML = `
    <div class="weather-main">
      <img src="${iconSrc}" alt="${description}" width="64" height="64">
      <div>
        <p class="weather-temp">${temp}&deg;C</p>
        <p class="weather-desc">${description}</p>
      </div>
    </div>
    <div class="weather-details">
      <p>High: ${high}&deg;C | Low: ${low}&deg;C</p>
      <p>Humidity: ${humidity}%</p>
    </div>
  `;
}

function displayForecast(data) {
  const today = new Date().toISOString().split('T')[0];
  const dailyMap = new Map();

  data.list.forEach((item) => {
    const [date, time] = item.dt_txt.split(' ');
    if (date !== today) {
      if (!dailyMap.has(date) || time === '12:00:00') {
        dailyMap.set(date, item);
      }
    }
  });

  const threeDays = Array.from(dailyMap.values()).slice(0, 3);
  const list = document.createElement('ul');
  list.classList.add('forecast-list');

  threeDays.forEach((day) => {
    const dateObj = new Date(day.dt * 1000);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(day.main.temp);

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${dayName}</span>
      <span class="forecast-temp">${temp}&deg;C</span>
    `;
    list.appendChild(listItem);
  });

  forecastContainer.innerHTML = '';
  forecastContainer.appendChild(list);
}

getWeatherData();