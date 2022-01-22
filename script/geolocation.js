import {fetchLonLatNowData} from './fetch.js'

// // GEOLOCATION

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





//FROM JATEEN
let geoLat, geoLon;
function success(position){
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    geoLon=position.coords.longitude;
    geoLat=position.coords.latitude;
    fetchLonLatNowData(geoLat, geoLon)
}
let geolocationError
function  error(err){
    console.warn(err.message);
    return geolocationError = err.message;
}

let options = {
    enableHighAccuracy:true,
    timeout: 5000,
    maximumAge: 0
};
//Navigator
function getLocation(){
    navigator.geolocation.getCurrentPosition(success,error,options);
}
//

// let personData = {
//     name:'Jateen',
//     email:'jateen@codestack.co'
// }

// localStorage.setItem('peopleData',JSON.stringify(personData));

let personData = JSON.parse(localStorage.getItem('peopleData'));
//console.log(personData);

export {geolocationError, geoLon, geoLat, getLocation}