
import React, { useState, useEffect } from "react";
import UilReact from '@iconscout/react-unicons/icons/uil-react';

import Citytemp from "./container/citytemp"
import Searchlocation from "./container/searchlocation";
import Hourlyforecast from "./container/hourlyforecast";
import Dailyforecast from "./container/dailyforecast";
import Datetime from "./container/datetime";
//import Logic from "./container/logic";
import getWeatherData from "./container/logic";

function App() {
  const [query, setQuery] = useState({ q: "london" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherData({ ...query, units });
        console.log("Fetched weather data:", data);
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query, units]);


  return (
    <div className="flex justify-center space-x-1 ">

      <div>
        <div
          className="mx-auto max-w-screen-md mt-4 px-5 py-5 bg-gradient-to-br from-blue-950 to-teal-950">
          <h1 className="text-7xl text-center text-red-400 shadow-xl shadow-red-500"></h1>
          <UilReact />
          <Searchlocation weather={weather} setQuery={setQuery} />
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {weather && (
          <div className="mx-auto max-w-screen-md px-5 py-5 bg-gradient-to-br from-teal-950 to-blue-950">
            <Datetime weather={weather} />
            <Hourlyforecast weather={weather} />
          </div>)}</div>

      <div>
        {weather && (
          <div
            className="mx-auto max-w-screen-md mt-4 px-5 py-8 bg-gradient-to-br from-cyan-950 to-pink-950">
            <h1 className="text-7xl text-center text-red-400 shadow-xl shadow-red-500"></h1>
            <Citytemp weather={weather} />
            <Dailyforecast weather={weather} />

          </div>
        )}
      </div>

    </div>

  );
}

export default App;
