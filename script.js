import getDate from "./Date.js";
import Forecast from "./Forecast.js";

const arrayCities = [
  "Bogota",
  "Madrid",
  "İstanbul",
  "Tokyo",
  "Honolulu",
  "Los Angeles",
  "Rio de Janeiro",
  "Dubai",
  "Beijing",
  "London",
  "Johannesburg",
  "Delhi",
  "Mexico City",
  "Saint Petersburg",
];

let result = Math.floor(Math.random() * arrayCities.length);
const arrow = document.querySelector(".arrow");
const button = document.querySelector(".search button");
const cUnitButton = document.querySelector(".c");
const fUnitButton = document.querySelector(".f");
const input = document.querySelector(".search-bar");
const date = document.querySelector(".date");
const cityInfo = document.querySelector(".city");
const tempInfo = document.querySelector(".temp");
const iconInfo = document.querySelector(".icon");
const descriptionInfo = document.querySelector(".description");
const pressureInfo = document.querySelector(".pressure");
const humidityInfo = document.querySelector(".humidity");
const dewPointInfo = document.querySelector(".dewPoint");
const windInfo = document.querySelector(".wind");
const visibilityInfo = document.querySelector(".visibility");
const division = document.querySelector(".division");
const tempBox = document.querySelector(".tempBox");
const windBox = document.querySelector(".windBox");
const cardbackground = document.querySelector(".card");
const forecastBoxBackground = document.querySelector(".forecastBox");

let units = "metric";
let tempUnits = "ºC";
let speedUnits = "m/s -";
let pressureUnits = "mbar";
let distanceUnits = "km";

cUnitButton.addEventListener("click", () => {
  if (units == "imperial") {
    units = "metric";
    if (input.value == "") {
      weather.fetchWeather(`${arrayCities[result]}`);
    } else {
      weather.search();
    }

    fUnitButton.style.color = "rgba(255, 255, 255, 0.267)";
    cUnitButton.style.color = "white";
    tempUnits = "ºC";
    speedUnits = "m/s -";
    pressureUnits = "mbar";
    distanceUnits = "km";
  }
});

fUnitButton.addEventListener("click", () => {
  if (units == "metric") {
    units = "imperial";
    if (input.value == "") {
      weather.fetchWeather(`${arrayCities[result]}`);
    } else {
      weather.search();
    }
    fUnitButton.style.color = "white";
    cUnitButton.style.color = "rgba(255, 255, 255, 0.267)";
    tempUnits = "ºF";
    speedUnits = "mph -";
    pressureUnits = "inHg";
    distanceUnits = "miles";
  }
});

let weather = {
  apikey: "72af917771cf73e92c2a1a471df270a5",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apikey +
        "&units=" +
        `${units}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        if (error) {
          input.style.outline = "1px solid red";
          cityInfo.style.color = "orange";
          cityInfo.innerText = "Not Found,";
          date.style.color = "orange";
          date.innerText = "Please provide a valid input.";
          tempInfo.innerText = "";
          iconInfo.src = "";
          descriptionInfo.innerText = "";
          pressureInfo.innerHTML = "";
          humidityInfo.innerText = "";
          dewPointInfo.innerText = "";
          windInfo.innerText = "";
          visibilityInfo.innerText = "";
          arrow.innerText = "";
          cUnitButton.innerText = "";
          fUnitButton.innerText = "";
          division.innerText = "";
          tempBox.style.display = "none";
          windBox.style.display = "none";
          cardbackground.style.boxShadow =
            "0px 0px 10px  rgba(255, 81, 0, 0.548)";
          forecastBoxBackground.style.display = "none";
        }
      });
  },

  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, pressure, humidity } = data.main;
    const { speed, deg } = data.wind;
    const { visibility } = data;

    forecastBoxBackground.style.display = "flex";
    tempBox.style.display = "flex";
    windBox.style.display = "flex";
    input.style.outline = "none";
    cUnitButton.innerText = "ºC";
    fUnitButton.innerText = "ºF";
    division.innerText = "|";
    arrow.innerText = "➤";
    cityInfo.style.color = "white";
    date.style.color = "white";
    cityInfo.innerText = "Weather in " + name + " " + country;
    tempInfo.innerText = temp;
    iconInfo.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descriptionInfo.innerText = description;

    if (pressureUnits == "inHg") {
      pressureInfo.innerText =
        "Pressure: " + (pressure / 33.864).toFixed(2) + pressureUnits;
    } else {
      pressureInfo.innerText = "Pressure: " + pressure + pressureUnits;
    }

    humidityInfo.innerText = "Humidity: " + humidity + "%";
    dewPointInfo.innerText =
      "Dew point: " + (temp - (100 - humidity) / 5).toFixed(2) + tempUnits;

    windInfo.innerText =
      "Wind speed: " + speed + speedUnits + " Deg: " + deg + "º ";

    arrow.style.transform = `rotate(${deg - 90 + 180}deg)`;

    if (distanceUnits == "miles") {
      visibilityInfo.innerText =
        "Visibility: " +
        ((visibility / 1000) * 0.62137).toFixed(2) +
        distanceUnits;
    } else {
      visibilityInfo.innerText =
        "Visibility: " + (visibility / 1000).toFixed(2) + distanceUnits;
    }

    fetchUnsplashImage(name);
  },
  search: function () {
    this.fetchWeather(input.value);
  },
};

function fetchUnsplashImage(city) {
  const unsplashAccessKey = "XSaE2uhm-aK9iMaQQyF3MG25kAuv0dfSM3uV4T7j-gI";
  fetch(
    `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashAccessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (window.screen.width < 800) {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
      } else {
        document.body.style.backgroundImage = `url(${data.urls.full})`;
      }
    })
    .catch((error) =>
      console.error("Error fetching image from Unsplash:", error)
    );
}

button.addEventListener("click", function () {
  weather.search();
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    weather.search();
  }
});

RamdomCities();

function RamdomCities() {
  if (input.value === "") {
    weather.fetchWeather(`${arrayCities[result]}`);
    getDate(`${arrayCities[result]}`);
    Forecast(`${arrayCities[result]}`);
  } else {
    getDate();
    Forecast();
  }
}
