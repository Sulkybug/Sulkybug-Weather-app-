const date = document.querySelector(".date");
const input = document.querySelector(".search-bar");
const button = document.querySelector(".search button");
const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const iconBackground = document.querySelector(".icon");
const icon1Background = document.querySelector(".icon1");
const icon2Background = document.querySelector(".icon2");
const icon3Background = document.querySelector(".icon3");
const cardbackground = document.querySelector(".card");
const forecastBoxBackground = document.querySelector(".forecastBox");

const radialGradientDay = `radial-gradient(
  circle,
  rgba(253, 255, 127, 0.548) 5%,
  rgba(255, 255, 255, 0) 50%,
  rgba(254, 254, 254, 0) 100%
) `;

const radialGradientNight = `radial-gradient(
  circle,
  rgba(127, 255, 212, 0.548) 5%,
  rgba(255, 255, 255, 0) 50%,
  rgba(254, 254, 254, 0) 100%
) `;

const cardBorderday = "0px 0px 10px  rgba(253, 255, 127, 0.548)";
const cardBorderNight = "0px 0px 10px  rgba(127, 255, 212, 0.548)";

function getDate(city) {
  let local = {
    apikey: "72af917771cf73e92c2a1a471df270a5",
    fetchDate: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          this.apikey +
          "&units=metric"
      )
        .then((response) => response.json())
        .then((data) => this.displaydate(data));
    },
    displaydate: function (data) {
      const { timezone } = data;
      let offset = timezone / 3600;

      function calcTime(city, offset) {
        if (timezone != undefined) {
          let d = new Date();
          let utc = d.getTime() + d.getTimezoneOffset() * 60000;
          let nd = new Date(utc + 3600000 * offset);
          let year = nd.getFullYear();
          let month = nd.getMonth() + 1;
          if (month < 10) {
            month = `0${month}`;
          }
          let day = week[nd.getDay()];
          let dayNum = nd.getDate();
          if (dayNum < 10) {
            dayNum = `0${dayNum}`;
          }

          let hours = nd.getHours();
          let momentAMPM;
          if (hours === 0) {
            hours = `${hours + 12}`;
          }
          if (hours === 12) {
            momentAMPM = "PM";
          }
          if (hours > 12) {
            momentAMPM = "PM";
            hours = `${hours - 12}`;
          } else {
            momentAMPM = "AM";
            hours = `${hours}`;
          }
          if (hours === 12) {
            momentAMPM = "PM";
          }

          let minutes = nd.getMinutes();
          if (minutes < 10) {
            minutes = `0${minutes}`;
          }

          if (momentAMPM === "PM" && hours >= 7) {
            iconBackground.style.background = radialGradientNight;
            icon1Background.style.background = radialGradientNight;
            icon2Background.style.background = radialGradientNight;
            icon3Background.style.background = radialGradientNight;
            cardbackground.style.boxShadow = cardBorderNight;
            forecastBoxBackground.style.boxShadow = cardBorderNight;
          } else if (momentAMPM === "PM" && (hours >= 12 || hours < 7)) {
            iconBackground.style.background = radialGradientDay;
            icon1Background.style.background = radialGradientDay;
            icon2Background.style.background = radialGradientDay;
            icon3Background.style.background = radialGradientDay;
            cardbackground.style.boxShadow = cardBorderday;
            forecastBoxBackground.style.boxShadow = cardBorderday;
          } else if (momentAMPM === "AM" && (hours >= 12 || hours < 6)) {
            iconBackground.style.background = radialGradientNight;
            icon1Background.style.background = radialGradientNight;
            icon2Background.style.background = radialGradientNight;
            icon3Background.style.background = radialGradientNight;
            cardbackground.style.boxShadow = cardBorderNight;
            forecastBoxBackground.style.boxShadow = cardBorderNight;
          } else if (momentAMPM === "AM" && hours >= 6) {
            iconBackground.style.background = radialGradientDay;
            icon1Background.style.background = radialGradientDay;
            icon2Background.style.background = radialGradientDay;
            icon3Background.style.background = radialGradientDay;
            cardbackground.style.boxShadow = cardBorderday;
            forecastBoxBackground.style.boxShadow = cardBorderday;
          } else {
          }

          date.innerHTML =
            `${month}/${day}${dayNum}/${year}` +
            " - " +
            `${hours}:${minutes}` +
            momentAMPM;
        }
      }

      calcTime(city, offset);
    },
    search: function () {
      this.fetchDate(input.value);
    },
  };

  local.fetchDate(city);

  button.addEventListener("click", function () {
    local.search();
  });

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      local.search();
    }
  });
}

export default getDate;
