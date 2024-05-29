import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';



function Searchlocation({ weather, setQuery }) {


  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };




  return (
    <div>
      <div>
        <div className="flex flex-row text-center justify-between text-red-200">
          <button className='text-2xl text-red-200 transition ease-out hover:scale-110 mx-5'
            onClick={handleLocationClick}
          >
            <UilLocationPoint />
          </button>

          < input type="text"
            placeholder='search city here'
            className="text-xl text-center font-serif focus:outline-none capitalize text-blue-950"
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
          >
          </input>

          <button className='text-2xl text-red-200 transition ease-out hover:scale-110 mx-5'
            onClick={handleSearchClick}
          >
            < UilSearch />
          </button>
        </div>
        {weather && (
          <div>
            <div className='text-center text-3xl text-red-200 my-4'>{`${weather.name}, ${weather.country}`}</div>
            <div className='text-center text-1xl text-red-200 my-4'>{`${weather.description}`}</div>
          </div>
        )}


      </div>

    </div>


  )
}

export default Searchlocation