//import UilReact from '@iconscout/react-unicons/icons/uil-react'
import React from 'react'

function dailyforecast({weather}) {
  if (!weather || !weather.daily) {
    return null;
  }

  const dailyForecasts = weather.daily;
  console.log("Daily Forecasts:", dailyForecasts);

  return (
    <div className="text-pink-100">
      <h2 className="text-3xl text-center justify-between">Daily Forecast</h2>

      <hr className='my-2 justyfy-between' />
      <div className="flex flex-row overflow-x-auto">


        {dailyForecasts.map((daily, index) => (
          <div key={index} className="flex flex-row ">
            <div className="flex flex-col items-center justify-center my-0.5">
              <p className="text-5m">{daily.title}</p>
              <img src={`https://openweathermap.org/img/wn/${daily.icon}.png`} alt="Weather icon"
                className="w-20 my-0" />
              <p className="text-medium">{Math.round(daily.temp)}&deg;C</p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
      
  

export default dailyforecast