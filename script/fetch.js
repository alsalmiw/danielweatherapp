import {prod, dev} from './environment.js';

let city, temperature, clearity, humidity, wind, precipitation, errorCode, longitude, latitude, todayIcon; 
let daysData, hourlyData, todaysData;
let apiKey;
if(prod.isLive){
    apiKey=prod.apiKey;
}
else{
    apiKey=dev.apiKey;
}


function fetchLonLat(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => getDataLonLat(data));
}

function fetchLonLatNowData(lat, lon){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => getDataCity(data))
    
}

function fetchCityNowData(cityName){
    fetch (`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => getDataCity(data));
}

function getDataCity(data){
    console.log(data)
    
    city = data.name;
    temperature = Math.floor(data.main.temp);
    let clear = data.weather[0].description;
    clearity = clear[0].toUpperCase()+ clear.substring(1);
    todayIcon=data.weather[0].icon;
    humidity = Math.floor(data.main.humidity);
    wind=Math.floor(data.wind.speed);
   longitude = data.coord.lon;
   latitude=data.coord.lat;
   errorCode = data.cod;

    todaysData ={
            city: city,
            temperature: temperature,
            clearity: clearity,
            humidity: humidity,
            wind: wind,
            todayIcon: todayIcon,
            precipitation: precipitation
        }

    console.log('longitude: '+longitude);
    console.log('latitude: '+latitude);
    console.log('error code: '+ errorCode);
    //console.log(todaysData);
    fetchLonLat(latitude, longitude);

}

function getDataLonLat(data){
    precipitation=data.minutely[30].precipitation;
    console.log(precipitation);

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

    //console.log("information for the next five days");
    //console.log(daysData);
    //console.log('information for the next five hours');
    //console.log(hourlyData);
}



export {fetchLonLat, fetchCityNowData, fetchLonLatNowData, todaysData, daysData, hourlyData}