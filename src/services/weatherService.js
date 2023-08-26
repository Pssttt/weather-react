import { DateTime } from "luxon";

// const API_KEY = "9442ad1d717c46ef58dccc1542339f80";
const API_KEY = "ef6ad2690f80d027b7798b316e905386";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const res = await fetch(url);
  return await res.json();
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  // const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { list } = data;
  list = list.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  return { list };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast/daily", {
    lat,
    lon,
    cnt: 6,
    units: searchParams.units,
  }).then(formatForecastWeather);

  console.log({ ...formattedCurrentWeather, ...formattedForecastWeather });
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).toFormat(format);

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
