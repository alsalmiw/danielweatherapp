let city, temperature, clearity, humidity, wind, precipitation, errorCode, longitude, latitude, todayIcon; 
let daysData, hourlyData, todaysData;



function fetchLonLat(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=15adc6353eb69144e59e8cdfa7ee8626`)
    .then(response => response.json())
    .then(data => getDataLonLat(data));
}

function fetchLonLatNowData(lat, lon){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=15adc6353eb69144e59e8cdfa7ee8626`)
    .then(response => response.json())
    .then(data => getDataCity(data))
}


function fetchCityNowData(cityName){
    fetch (`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=15adc6353eb69144e59e8cdfa7ee8626`)
    .then(response => response.json())
    .then(data => getDataCity(data));
}

function getDataCity(data){
    console.log(data)
    
    city = data.name;
    temperature = Math.floor(data.main.temp);
    clearity = data.weather[0].description;
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
            todayIcon: todayIcon
        }

    console.log('Information For Today');
    console.log(longitude);
    console.log(latitude);
    console.log(errorCode);
    console.log(todaysData);
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

    console.log("information for the next five days");
    console.log(daysData);
    console.log('information for the next five hours');
    console.log(hourlyData);
}



export {fetchLonLat, fetchCityNowData, fetchLonLatNowData, todaysData, daysData, hourlyData}