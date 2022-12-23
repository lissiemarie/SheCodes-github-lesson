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

//All doc selectors
const showTempSearch = (response) => {
    //temp
    let temp = document.querySelector(".temp");
    let currentTemp = Math.round(response.data.main.temp);
    temp.innerHTML = `${currentTemp}°C`;
    //city
    let city = document.querySelector("h1");
    let currentCity = response.data.name;
    city.innerHTML = currentCity;
    //weather
    let weather = document.querySelector(".current-weather");
    let currentWeather = response.data.weather[0].main;
    weather.innerHTML = currentWeather;
    //humidity
    let humidity = document.querySelector(".humidity");
    let currentHumidity = response.data.main.humidity;
    humidity.innerHTML = `Humidity: ${currentHumidity}`;
    //wind
    let wind = document.querySelector(".wind");
    let currentWind = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${currentWind}`;
  };

//When current button is clicked:
const getPosition = (position) => {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTempSearch);
  let searchbar = document.querySelector("#city-input");
  searchbar.innerHTML = " "
};

const currentGetPosition = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
};

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentGetPosition);

//when search button is clicked

const getSearchedCity = (event) => {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTempSearch);
};

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getSearchedCity);
