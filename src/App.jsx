import { useRef, useState } from "react";
import "./App.css";
import "./style.scss";
import dateNow from "./services/utils/date/dateNow";

function App() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const [weatherData, setWeatherData] = useState();

  const handleCityChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  const getPreviousWeatherData = () => {
    const url = `https://weatherapi-com.p.rapidapi.com/history.json?q=${city}&dt=${date}&lang=en&end_dt=${dateNow()}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8062fabb12msh2d6d6c774d06b10p14e8ddjsnf6f4900b422f",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forecast.forecastday.map((day) => {
          if (day.date == date) {
            setWeatherData(day);
          }
        });
      });
    // console.log(weatherData);
  };

  const getForecast = () => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8062fabb12msh2d6d6c774d06b10p14e8ddjsnf6f4900b422f",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) =>
        data.forecast.forecastday.map((day) => {
          if (day.date == date) {
            setWeatherData(day);
          }
        })
      );
    console.log(weatherData);
  };

  return (
    <div id="app">
      <h1>Weather application</h1>
      <div className="weather__wrapper">
        <input
          type="text"
          className="weather__wrapper-input-city pointer"
          placeholder="Type a city..."
          onChange={handleCityChange}
          value={city}
        />

        <input
          type="date"
          className="weather__wrapper-input-date pointer"
          onChange={handleDateChange}
          value={date}
        />

        <input
          className="weather__wrapper-input-submit pointer"
          type="submit"
          value="Send Request"
          onClick={() => {
            console.log(date, city);
            console.log(+Date.now() - +Date.parse(date));
            if (+Date.now() - +Date.parse(date) < 0) {
              getForecast();
            } else {
              getPreviousWeatherData();
            }
          }}
        />
        {weatherData != undefined ? (
          <div className="weather__day">
            <p
              style={{
                textTransform: "capitalize",
                color: "white",
                fontSize: 30,
                fontWeight: "normal",
                textAlign: "center",
              }}
            >
              {city}
            </p>
            <p
              style={{
                fontSize: 40,
                textAlign: "center",
                fontWeight: "normal",
                margin: "10px 0",
              }}
            >
              {weatherData.day.avgtemp_c}
            </p>
            <p style={{ textAlign: "center", marginBottom: 10, fontSize: 16 }}>
              {weatherData.day.condition.text}
            </p>
            <p style={{ textAlign: "center", fontSize: 17 }}>
              H:{weatherData.day.maxtemp_c}° L:{weatherData.day.mintemp_c}°
            </p>
          </div>
        ) : (
          <></>
        )}
        {weatherData != undefined ? (
          <div
            className="weather__card"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {weatherData != undefined ? (
              weatherData.hour.map((hour) => {
                return (
                  <div
                    style={{
                      color: "white",
                      marginRight: 5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "sans-serif",
                      fontSize: 22,
                      //  fontWeight: "bold",
                    }}
                  >
                    {hour.time.slice(10, 13)} <br />{" "}
                    <img
                      style={{ width: 110 }}
                      src={hour.condition.icon}
                      alt=""
                    />
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10,
                      }}
                    >
                      {hour.condition.text}
                    </span>
                    {Math.round(hour.temp_c)}°
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
