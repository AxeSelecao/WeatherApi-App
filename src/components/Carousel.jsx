import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dateNow from "../services/utils/date/dateNow";
import dateDiff from "../services/utils/date/dateDiff";
import {
  useGetForecastQuery,
  useGetPreviousWeatherQuery,
} from "../services/redux/weatherApi";

function Carousel() {
  const city = useSelector((state) => state.weather.city);
  const date = useSelector((state) => state.weather.date);

  const [weatherData, setWeatherData] = useState();

  const { data: futureWeatherData } = useGetForecastQuery({
    city: city,
    dateDiff: dateDiff(),
  });

  const { data: prevWeatherData } = useGetPreviousWeatherQuery({
    city: city,
    date: date,
  });

  useEffect(() => {
    if (
      +Date.now() - +Date.parse(date) < 0 &&
      futureWeatherData !== undefined
    ) {
      futureWeatherData.forecast.forecastday.map((day) => {
        if (day.date == date) {
          setWeatherData(day);
        }
      });
    } else if (prevWeatherData !== undefined) {
      prevWeatherData.forecast.forecastday.map((day) => {
        if (day.date == date) {
          setWeatherData(day);
        }
      });
    }
  }, [futureWeatherData, prevWeatherData]);

  return (
    <div>
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
            H:{weatherData.day.maxtemp_c}° L:
            {weatherData.day.mintemp_c}°
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
  );
}

export default Carousel;
