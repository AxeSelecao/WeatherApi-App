import { useState } from "react";
import { useDispatch } from "react-redux";
import { chooseCity, chooseDate } from "../services/redux/slice";

function Form() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  return (
    <>
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
          if (city !== "" && date !== "") {
            dispatch(chooseCity(city));
            dispatch(chooseDate(date));
          }
        }}
      />
    </>
  );
}

export default Form;
