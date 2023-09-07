import "./App.css";
// import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./component/TopButtons";
import Inputs from "./component/Inputs";
import TimeAndLocation from "./component/TimeAndLocation";
import TemperatureAndDetails from "./component/TemperatureAndDetails";
import Forecast from "./component/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country} `
        );

        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) {
      return " from-cyan-400 to-blue-700";
    }
    const threshold = units === "metric" ? 20 : 70;
    if (weather.temp <= threshold) {
      return " from-cyan-400 to-blue-700";
    }
    return "from-yellow-400 to-red-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 `}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} units={units} />
          <Forecast
            title="hourly forecast"
            items={weather.hourly}
            units={units}
          />
          <Forecast
            title="daily forecast"
            items={weather.daily}
            units={units}
          />
        </div>
      )}

      <ToastContainer
        autoClose={2000}
        theme="colored"
        newestOnTop={true}
        position="top-right"
      />
    </div>
  );
}

export default App;
