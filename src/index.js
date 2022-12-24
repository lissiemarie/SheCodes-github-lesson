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
const showCurrentTempSearch = (response) => {
    //temp
    let temp = document.querySelector(".temp");
    let currentTemp = Math.round(response.data.temperature.current);
    temp.innerHTML = `${currentTemp}°F`;
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

    let emoji = document.querySelector(".emoji");
    let currentEmoji = response.data.condition.icon_url;
    emoji.setAttribute("src", currentEmoji);

  };

  //API KEY!
  let apiKey = "00f36a13417d323ad5btb367oe1a594f";

// //When current button is clicked:
// const getPosition = (position) => {
//   let lat = position.data.coordinates.latitude;
//   let long = position.data.coordinates.longitude;
//   let url = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=imperial`;
//   axios.get(url).then(showCurrentTempSearch);
// };

// const currentGetPosition = (event) => {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(getPosition);
// };

// let currentButton = document.querySelector("#current-button");
// currentButton.addEventListener("click", currentGetPosition);

//when search button is clicked

const getSearchedCity = (event) => {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=imperial`;
  axios.get(url).then(showCurrentTempSearch);
};

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getSearchedCity);
