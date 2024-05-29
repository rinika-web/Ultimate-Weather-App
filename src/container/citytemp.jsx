import React from 'react'
import { UilSun, UilSunset, } from '@iconscout/react-unicons';
import { localTime } from './logic';

function Citytemp({weather}) {
    console.log("Weather data in CityTemp:", weather); 
    
    const { temp, feels_like, humidity, speed, sunrise, sunset, icon } = weather;
  
    console.log("Weather data fetched in CityTemp:", { temp, feels_like, humidity, sunrise, sunset, icon, speed });
  
    console.log("Weather data fetching CityTemp:", { temp, feels_like, humidity, sunrise, sunset, icon, speed });

    const roundedTemp = Math.round(temp);
    const roundedFeels = Math.round(feels_like);

    return (
        <div className='text-pink-100'>
            <div>

                <div className=' text-center justify-between  py-3 text-pink-100 space-y-2'>
                    
                    <p className=' text-5xl'>{`${roundedTemp}`}&deg;C</p>
                    
                    
                    <div className="flex flex-row text-center justify-between space-x-2 py-3 text-pink-100">
                        
                        <img src={`https://openweathermap.org/img/wn/${icon}.png`}
                            alt="Weather Info"
                            className="w-700" />
                        
                        
                        <div className="flex flex-col items-center justify-center space-y-2 text-pink-100 text-5m ">
                            <div className="flex flex-row">
                                <UilSun />
                                <p className="font-light">Sunrise: <span>{localTime(sunrise, 'local', 'hh:mm a')}</span>
                                </p>
                            </div>

                            <div className="flex flex-row">
                                <UilSunset />
                                <p className="font-light">Sunset: <span>{localTime(sunset, 'local', 'hh:mm a')}</span>
                                </p>
                            </div>
                        </div>
                        
                        
                        <div>
                            <div className="flex flex-row text-5m space-y-2 ">
                                Feels like <span className='ml-1'>{`${roundedFeels}`}&deg;C</span>
                            </div>
                            <div className="flex flex-row text-5m space-y-2 ">
                                Humidity <span className='ml-1'>{humidity}%</span>
                            </div>
                            <div className="flex flex-row text-5m space-y-2 ">
                                Wind Speed <span className="ml-1">{speed} km/h</span>
                            </div>
                        </div>

                    
                    </div>

                </div>

            </div>

        </div>


    )
}

export default Citytemp


