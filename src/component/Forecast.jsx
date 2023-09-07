import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items, units }) {
  let tempUnit = "";

  if (units === "metric") {
    tempUnit = "°C";
  }
  if (units === "imperial") {
    tempUnit = "°F";
  }

  return (
    <div>
      <div className="flex items-center justify-start my-4 py-2">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm uppercase">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt="weather icon"
              className="w-12 my-2"
            />
            <p className="font-medium">{`${item.temp.toFixed()}${tempUnit}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
