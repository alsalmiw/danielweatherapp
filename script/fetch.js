import {prod, dev} from './environment.js';

let city, temperature, clearity, humidity, wind, errorCode=false, longitude, latitude, todayIcon, feelsLike; 
let daysData, hourlyData, todaysData;
let apiKey;
if(prod.isLive){
    apiKey=prod.apiKey;
}
else{
    apiKey=dev.apiKey;
}

// FETCH FOR DAILY AND HOURLY INFORMATION
function fetchLonLat(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => getDataLonLat(data))
    .catch(error => console.log(error));
}

// FETCH TO ENTER LON AND LAT FROM GEOLOCATION
function fetchLonLatNowData(lat, lon){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => getDataCity(data))
}

// FETCH TO SEARCH BY CITY NAME : SEARCH BAR AND FAVORITES
function fetchCityNowData(cityName){
    fetch (`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => getDataCity(data))
    .catch(error => console.log(error))
}

// FUNCTIONS TO GET SPECIFIC DATA TO EXPORT TO APP.JS
function getDataCity(data){
    if (data.cod >= 400){
        errorCode=true;
        return;
    }
    else{
        errorCode=false;
        city = data.name;
        temperature = Math.floor(data.main.temp);
        let clear = data.weather[0].description;
        clearity = clear[0].toUpperCase()+ clear.substring(1);
        todayIcon=data.weather[0].icon;
        humidity = Math.floor(data.main.humidity);
        wind=Math.floor(data.wind.speed);
        longitude = data.coord.lon;
        latitude=data.coord.lat;
        feelsLike = Math.floor(data.main.feels_like);
   
        todaysData ={
            city: city,
            temperature: temperature,
            clearity: clearity,
            humidity: humidity,
            wind: wind,
            todayIcon: todayIcon,
            feelsLike: feelsLike
        }
    fetchLonLat(latitude, longitude);
    }
}

function getDataLonLat(data){
    let day = data.daily;
    let date, days=[], highTemp, lowTemp, daysIcons=[], icons; 
    let daysHighTemp=[], daysLowTemp=[];
    daysData={
        days: days,
        daysHighTemp: daysHighTemp,
        daysLowTemp: daysLowTemp,
        daysIcons: daysIcons
    }

    let hourly=data.hourly, hour, hours=[], temp, hoursTemps=[], hoursIcons=[], hrIcon;
    hourlyData={
        hours: hours,
        hoursTemps: hoursTemps,
        hoursIcons: hoursIcons
    }
 
    for(let i=1; i<=5; i++)
    {
        // NEXT FIVE DAYS
         date = new Date(day[i].dt*1000).toLocaleDateString('default', {weekday: 'long'});
         days.push(date.toString())
         highTemp = Math.floor(day[i].temp.max);
         daysHighTemp.push(highTemp);
         lowTemp= Math.floor(day[i].temp.min);
         daysLowTemp.push(lowTemp);
         icons=day[i].weather[0].icon;
         daysIcons.push(icons);

        // NEXT FIVE HOURS
         hour = new Date(hourly[i].dt*1000).toLocaleTimeString('default', {hour: '2-digit', hour12: true}).replaceAll(' ', '').replace(/\b0+/g, '');
         hours.push(hour);
         temp = Math.floor(hourly[i].temp);
         hoursTemps.push(temp)
         hrIcon=hourly[i].weather[0].icon;
         hoursIcons.push(hrIcon);
    }
}

export {fetchCityNowData,fetchLonLatNowData, todaysData, daysData, hourlyData, errorCode}