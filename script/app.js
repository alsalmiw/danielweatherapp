import {fetchLonLat, fetchCity} from './fetch.js';
let city ='muscat'
document.body.style.backgroundImage= `url('https://source.unsplash.com/1620x900/?${city}')`;
fetchCity(city);
fetchLonLat(37.7, 121);