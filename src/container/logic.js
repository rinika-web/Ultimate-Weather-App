import { DateTime } from "luxon";

const API_key = "ba68d24cd33a3daa4f71d86b2d922d82";
const main_Url = "https://api.openweathermap.org/data/2.5";


const weatherData = (info, query) => {
    const url = new URL(main_Url + "/" + info);
    url.search = new URLSearchParams({ ...query, appid: API_key });
    console.log("Request URL:", url.toString());

    //return fetch(url)
        //.then((res) => res.json());

        return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`API request failed with status ${res.status}`);
            }
            return res.json();
        });
};
const formattedCurrentweather = (data) => {
    console.log("raw weather data:", data);

    if (!data || !data.coord || !data.main || !data.wind || !data.sys || !data.weather || !data.weather[0]) {
        throw new Error("Invalid data format received from weather API");
    }

    const timezone = data.timezone;

    const {
        coord: { lat, lon },
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { country, sunrise, sunset },
        name,
        dt,
        weather,

    } = data;
    const {
        description, icon
    } = weather[0];
    return {
        lat, lon, temp, feels_like, humidity,
        speed, country, sunrise, sunset, name, dt, description, icon,
        timezone

    }
}

const formatForecastweather = (data) => {
    let { city, list } = data;
    const timezone = city.timezone;

    // Map daily and hourly data based on the list
    const daily = list
        .filter((_, index) => index % 8 === 0)
        .slice(0, 5)
        .map(d => ({
            title: localTime(d.dt, timezone, 'ccc'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }));


        const hourly = list.slice(1, 6).map(d => ({
            title: localTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }));
    

    return { timezone, daily, hourly };

}

const getWeatherData = async (searchParams) => {
    try {
        const rawWeatherData = await weatherData
        ('weather', searchParams);
    
        const formattedWeatherData = formattedCurrentweather(rawWeatherData);
        console.log("rormatted current weather data:", formattedWeatherData);
    
    const { lat, lon } = formattedWeatherData;
    
    const forecastWeather = await weatherData('forecast', {
        lat,
        lon,
        units: searchParams.units
    }).then(formatForecastweather);
    
    console.log("forecast info:", forecastWeather);

    return { ...formattedWeatherData, ...forecastWeather };
    } catch (error) {
        console.error("error fetching weather data", error);
        throw error;
    }

};

const localTime = (secs, zone, format = "cccc, dd LLL yyyy 'Local time:' hh:mm a") => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};
const iconfromurl =(icons) => `https://openweathermap.org/img/wn/{code}@2x.png`;
console.log("this is icons:", iconfromurl);


export default getWeatherData;

export { localTime, iconfromurl };




