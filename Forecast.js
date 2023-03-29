const input = document.querySelector(".search-bar");
const button = document.querySelector(".search button");
const infoDay1 = document.querySelector(".infoDay1");
const icon1 = document.querySelector(".icon1");
const date1 = document.querySelector(".date1");
const infoDay2 = document.querySelector(".infoDay2");
const icon2 = document.querySelector(".icon2");
const date2 = document.querySelector(".date2");
const infoDay3 = document.querySelector(".infoDay3");
const icon3 = document.querySelector(".icon3");
const date3 = document.querySelector(".date3");
const cUnitButton = document.querySelector(".c");
const fUnitButton = document.querySelector(".f");
let units = "metric";
let tempUnits = "ºC";

function Forecast(city) {
  let local = {
    apikey: "72af917771cf73e92c2a1a471df270a5",
    fetchForecast: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          this.apikey +
          "&units=" +
          `${units}`
      )
        .then((response) => response.json())
        .then((data) => this.displaydate(data));
    },
    displaydate: function (data) {
      const dateinfo1 = data.list[4].dt_txt;
      const des1 = data.list[4].weather[0].description;
      const iconInfo1 = data.list[4].weather[0].icon;
      const temp1 = data.list[5].main.temp;

      const dateinfo2 = data.list[12].dt_txt;
      const des2 = data.list[12].weather[0].description;
      const iconInfo2 = data.list[12].weather[0].icon;
      const temp2 = data.list[13].main.temp;

      const dateinfo3 = data.list[19].dt_txt;
      const des3 = data.list[19].weather[0].description;
      const iconInfo3 = data.list[19].weather[0].icon;
      const temp3 = data.list[20].main.temp;

      infoDay1.innerHTML = des1;
      icon1.src = "https://openweathermap.org/img/wn/" + iconInfo1 + ".png";
      date1.innerHTML = dateinfo1.slice(5, -8) + "| " + temp1 + tempUnits;

      infoDay2.innerHTML = des2;
      icon2.src = "https://openweathermap.org/img/wn/" + iconInfo2 + ".png";
      date2.innerHTML = dateinfo2.slice(5, -8) + "| " + temp2 + tempUnits;

      infoDay3.innerHTML = des3;
      icon3.src = "https://openweathermap.org/img/wn/" + iconInfo3 + ".png";
      date3.innerHTML = dateinfo3.slice(5, -8) + "| " + temp3 + tempUnits;
    },

    search: function () {
      this.fetchForecast(input.value);
    },
  };

  local.fetchForecast(city);

  button.addEventListener("click", function () {
    local.search();
  });

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      local.search();
    }
  });

  cUnitButton.addEventListener("click", () => {
    if (units == "imperial") {
      units = "metric";
      if (input.value == "") {
        local.fetchForecast(city);
      } else {
        local.search();
      }

      fUnitButton.style.color = "rgba(255, 255, 255, 0.267)";
      cUnitButton.style.color = "white";
      tempUnits = "ºC";
    }
  });

  fUnitButton.addEventListener("click", () => {
    if (units == "metric") {
      units = "imperial";
      if (input.value == "") {
        local.fetchForecast(city);
      } else {
        local.search();
      }
      fUnitButton.style.color = "white";
      cUnitButton.style.color = "rgba(255, 255, 255, 0.267)";
      tempUnits = "ºF";
    }
  });
}

export default Forecast;
