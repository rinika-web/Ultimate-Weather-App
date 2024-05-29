import React from 'react';

function HourlyForecast({ weather }) {
  if (!weather || !weather.hourly) {
    return null;
  }

  const hourlyForecasts = weather.hourly.slice(0, 5);

  return (
    <div className="text-red-200">
      <h2 className="text-3xl text-center justify-between">Hourly Forecast</h2>

      <hr className='my-2 justyfy-between' />
      <div className="flex flex-row overflow-x-auto">


        {hourlyForecasts.map((hourly, index) => (
          <div className="flex flex-row ">
            <div key={index} className="flex flex-col items-center justify-center my-0.5">
              <p className="text-5m">{hourly.title}</p>
              <img src={`https://openweathermap.org/img/wn/${hourly.icon}.png`} alt="Weather icon"
                className="w-20 my-0" />
              <p className="text-medium">{Math.round(hourly.temp)}&deg;C</p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default HourlyForecast;
