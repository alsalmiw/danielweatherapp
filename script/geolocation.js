import {fetchLonLatNowData, fetchCityNowData} from './fetch.js'

//FROM JATEEN
let geoLat, geoLon;
function success(position){
    geoLon=position.coords.longitude;
    geoLat=position.coords.latitude;
    fetchLonLatNowData(geoLat, geoLon);
}
let geolocationError
function  error(err){
    console.warn(err.message);
    fetchCityNowData('London');
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

export {getLocation}