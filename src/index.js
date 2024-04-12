function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;


    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = temperature;

    getForecast(response.data);
  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-form-input");
    let city = searchInputElement.value;
  
    let apiKey = "c2fa2f0a85c4ebtf3304fbofa4a162d0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

  function getForecast(city) {
    let apiKey = "c2fa2f0a85c4ebtf3304fbofa4a162d0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metrics`;
    axios(apiUrl).then(displayForecast);
    console.log(apiUrl);
  }

  function displayForecast(response)  {
    console.log(response.data);

  }
    let forecastElement = document.querySelector("#forecast");

    let days = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    let forecastHtml = "";

    days.forEach(function(day) {
      forecastHtml = 
      forecastHtml + 
      `
      <div class="weather-forecast-day">
                  <div class="weather-forecast-date">
                  ${day}
                  </div>
                  <div class = "weather-forecast-icon">
                  🌤️
                  </div>
                  <div class="weather-forecast-temperature">
                  
                  <span class="maximum-temperature">18°</span> 
                  <span class="minimum-temperature">12°</span>
      </div>
      </div>
      `;
    });

    forecastElement.innerHTML = forecastHtml;
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  
  getForecast("Johannesburg");


  