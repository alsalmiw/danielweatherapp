import {fetchLonLat, fetchCityNowData, fetchLonLatNowData,  todaysData, daysData, hourlyData} from './fetch.js';
import {personDataInfo} from './localStorage.js';
import {geolocationError, geoLon, geoLat} from './geolocation.js';
let city ='muscat'


document.body.style.backgroundImage= `url('https://source.unsplash.com/1620x900/?${city}')`;


fetchCityNowData(city);

setTimeout(() => {
    console.log(todaysData);
    console.log(daysData);
    console.log(hourlyData);
}, 2000);
// GEOLOCATION

// function success(position){
//     console.log(position);
// }

// function error(err){
//     console.warn(err.message);
// }
// let options ={
//     enableHighAccuracy:true,
//     timout: 5000,
//     maximumAge: 0
// };




// //  navigator
// navigator.geolocation.getCurrentPosition( success, error, options); 


// let personData = {
//     name: 'Walaa',
//     email: 'alsalmiw@gmail.com'
// }
// console.log(personData);
// localStorage.setItem('peopleData', JSON.stringify(personData))

// let personDataInfo = JSON.parse(localStorage.getItem('peopleData'));
// console.log(personDataInfo);