import "./App.css";
import "./style.scss";
import Carousel from "./components/Carousel";
import Form from "./components/Form";

function App() {
  return (
    <div id="app">
      <h1>Weather application</h1>
      <div className="weather__wrapper">
        <Form />
        <Carousel />
      </div>
    </div>
  );
}

export default App;
