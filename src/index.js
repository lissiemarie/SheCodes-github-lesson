import "./styles.css";

//Date and Time
let now = new Date();
let dayTime = document.querySelector(".date-time");

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = daysOfWeek[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

if (currentMinutes >= 10) {
  dayTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
} else {
  dayTime.innerHTML = `${currentDay} ${currentHour}:0${currentMinutes}`;
}

//Display forecast function

const displayForecast = (response) => {
  let forecastElem = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
          <p>
            <span class="day-one">${day}</span><br /><span class="day-one-emoji"
              >⛅</span
            ><br />
            <span class="forecast-temp-max">40</span>
            <span class="forecast-temp-min">25</span>
          </p>`;
});
  forecastElem.innerHTML = forecastHTML
};

//Forecast API call
const getForecast = city => {
  let apiKey = "00f36a13417d323ad5btb367oe1a594f";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
  axios.get(url).then(displayForecast);
}

//All doc selectors
const showCurrentTempSearch = (response) => {

  fahrenheitTemperature = response.data.temperature.current;
    //temp
    let temp = document.querySelector(".temp");
    let currentTemp = Math.round(fahrenheitTemperature);
    temp.innerHTML = `${currentTemp}`;
    //city
    let city = document.querySelector("h1");
    let currentCity = response.data.city;
    city.innerHTML = currentCity;
    //weather
    let weather = document.querySelector(".current-weather");
    let currentWeather = response.data.condition.description;
    weather.innerHTML = currentWeather;
    //humidity
    let humidity = document.querySelector(".humidity");
    let currentHumidity = response.data.temperature.humidity;
    humidity.innerHTML = `Humidity: ${currentHumidity}%`;
    //wind
    let wind = document.querySelector(".wind");
    let currentWind = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${currentWind} mph`;
    
    let emoji = document.querySelector(".current-emoji");
    let currentEmoji = response.data.condition.icon_url;
    emoji.setAttribute("src", currentEmoji);
  };
  
  //API KEY!
  const search = city => {
    let apiKey = "00f36a13417d323ad5btb367oe1a594f";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(url).then(showCurrentTempSearch)
  }
  // //When current button is clicked:
  // const getPosition = (position) => {
    //   let lat = position.data.coordinates.latitude;
    //   let long = position.data.coordinates.longitude;
    //   let url = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=imperial`;
    //   ;
    // };
    
    // const currentGetPosition = (event) => {
      //   event.preventDefault();
      //   navigator.geolocation.getCurrentPosition(getPosition);
      // };
      
      // let currentButton = document.querySelector("#current-button");
      // currentButton.addEventListener("click", currentGetPosition);
      
      //when search button is clicked
      
// const getSearchedCity = (event) => {
//   event.preventDefault();
//   let cityInput = document.querySelector("#city-input").value;

//   axios.get(url).then(showCurrentTempSearch);
// };

// let searchButton = document.querySelector("#search-button");
// searchButton.addEventListener("click", getSearchedCity);

//New search function..
const handleSubmit = event => {
  event.preventDefault();
  let cityInputElem = document.querySelector("#city-input");
  search(cityInputElem.value);
}

//Celsius conversion

const showCelsiusTemp = event => {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let celsiusValue = (temperatureElement.innerHTML - 32) * 5/9;
  temperatureElement.innerHTML = Math.round(celsiusValue);
}

//Fahrenheit conversion

const showFahrenheitTemp = event => {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//Event Listeners

let fahrenheitTemperature = null;

let form = document.querySelector("#input-form");
form.addEventListener("submit", handleSubmit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
