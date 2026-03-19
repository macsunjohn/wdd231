const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const description = document.querySelector('#description');

const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=9.08&lon=7.40&units=metric&appid=1e591d429080408dd9859b30c691a04d';

async function apiFetch() {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  // main temp
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;

  // description
  description.textContent = data.weather[0].description;

  // icon
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.src = iconSrc;
  weatherIcon.alt = data.weather[0].description;

  // extra data
  high.textContent = `${data.main.temp_max}°C`;
  low.textContent = `${data.main.temp_min}°C`;
  humidity.textContent = `${data.main.humidity}%`;

  // convert sunrise/sunset
  const sunriseTime = new Date(data.sys.sunrise * 1000);
  const sunsetTime = new Date(data.sys.sunset * 1000);

  sunrise.textContent = sunriseTime.toLocaleTimeString();
  sunset.textContent = sunsetTime.toLocaleTimeString();
}

apiFetch();

const forecastEl = document.querySelector('#forecast');

const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=9.08&lon=7.40&units=metric&appid=1e591d429080408dd9859b30c691a04d';

async function getForecast() {
  try {
    const response = await fetch(forecastURL);

    if (response.ok) {
      const data = await response.json();

        const threeDays = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

      forecastEl.innerHTML = threeDays.map(day => {
        const date = new Date(day.dt * 1000);

          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        return `${dayName}: <strong>${Math.round(day.main.temp)}°C</strong>`;
      }).join("<br>");

    } else {
      throw Error(await response.text());
    }

  } catch (error) {
    console.log(error);
  }
}

getForecast();