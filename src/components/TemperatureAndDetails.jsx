import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    weather,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        {`${weather[0].main}`}
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(weather[0].icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels like:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed}`} m/s</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {new Date(sunrise * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {new Date(sunset * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowUp />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
