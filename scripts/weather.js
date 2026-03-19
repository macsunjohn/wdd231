// select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL (Trier, Germany)
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=1e591d429080408dd9859b30c691a04d';

// fetch data from API
async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data); 
    } else {
      throw Error(await response.text());
    }

  } catch (error) {
    console.log(error);
  }
}

// display results on the page
function displayResults(data) {
  // temperature
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;

  // weather icon
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  // description
  const desc = data.weather[0].description;

  // set attributes
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);

  // caption text
  captionDesc.textContent = desc;
}

// call the function
apiFetch();