import {fetchLonLat, fetchCityNowData, fetchLonLatNowData,  todaysData, daysData, hourlyData} from './fetch.js';
import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from './localStorage.js';
import {geolocationError,getLocation, geoLon, geoLat} from './geolocation.js';
import {createDailyCard, createHourlyCard, createFavoritesCards} from './components.js';

let searchCityInput = document.getElementById('searchInput'),
searchCityBtn = document.getElementById('submitBtn'),
heartFavorite = document.getElementById('heart'),
heartMsg=document.getElementById('heartMsg');

let daysContainer=document.getElementById('daysContainer');
let hourlyDailyToggle=document.getElementById('hourlyToggle');
let city;
let favoriteCities =getLocalStorage();

firstTimeIntoSite();
searchFromFavorites();
deleteFavoriteCard();

function firstTimeIntoSite(){
if (favoriteCities.length ==0){
    //run geo location
    console.log('i ran');
    getLocation();
    getFetchedData();
    
}
else{
    getFavorites();
}

}

function getFetchedData(){
     setTimeout(() => {
        console.log(todaysData);
        console.log(daysData);
        console.log(hourlyData);
        addTodayWeather();
        DayCards();
        document.body.style.backgroundImage= `url('https://source.unsplash.com/1620x900/?${todaysData.city}')`;
        }, 5000);
}

// to check if local storage is empty
function getFavorites(){
    findCity(favoriteCities[0])
    favoriteCities.forEach(element => {
        if (!element=='')
        {
            addFavoriteCard(false, element.toUpperCase());
        }

        
    });
}

function searchFromFavorites(){
    let favoritesCard=document.getElementsByClassName('favorites-card');

    Object.entries(favoritesCard).map(item => {
     item[1].addEventListener('click', function(){
        findCity(item[1].id)
        heartMsg.textContent='Remove Favorite';
        heartFavorite.checked=true;
     })
    });
}

function cityUserInput(){
    findCity(searchCityInput.value);
}

function findCity(cityName){
    document.body.style.backgroundImage= `url('https://source.unsplash.com/1620x900/?${cityName}')`;
    fetchCityNowData(cityName);
    setTimeout(() => {
    console.log(todaysData);
    console.log(daysData);
    console.log(hourlyData);
    addTodayWeather();
    DayCards();
    }, 2000);

}


function addRemoveToFavorite(isTrue){
    let displayedCity = document.getElementById('city').textContent.toUpperCase();
    isTrue? saveToLocalStorage(displayedCity): removeFromLocalStorage(displayedCity);
    isTrue? heartMsg.textContent='Remove Favorite': heartMsg.textContent='Add to Favorites';
    isTrue? addFavoriteCard(false, displayedCity): addFavoriteCard(true, displayedCity);
    isTrue? createFavoritesCards(displayedCity): null;  
    deleteFavoriteCard();
}

// ADD INFORMATION TO THE PAGE

function addTodayWeather(){
    let todayInfoPlacement=['city', 'temperature', 'clearity', 'humidity', 'wind', 'precipitation', 'todayIcon'];

   todayInfoPlacement.map((item) =>{
       let element = document.getElementById(item);
       element.textContent=todaysData[item]
      
       if (item == 'todayIcon'){
           element.src=`http://openweathermap.org/img/wn/${todaysData[item]}@2x.png`;
       }
   })
}

function DayCards(){
    let dayObject = document.getElementsByClassName('days-card');

        if (Object.entries(dayObject).length < 5){
            addDayCards();
        }
        else{
              console.log('need to figure you out');
             removeDaysCards();
             setTimeout(() => {
                addDayCards();
             }, 100);
        }
}

function removeDaysCards(){
    let daysContainer = document.getElementById('daysContainer');
    daysContainer.innerHTML='';
     
}

function addDayCards(){
    for(let i =0; i<daysData.days.length; i++)
    {
    let daysCard = createDailyCard(daysData.days[i], daysData.daysIcons[i], daysData.daysHighTemp[i], daysData.daysLowTemp[i], i);
    daysContainer.appendChild(daysCard);
    }
}

function hourlyDailySwitch(isHourly){
    isHourly?  removeDaysCards(): removeDaysCards();
    isHourly? addHourlyCards():addDayCards();
}

function addHourlyCards(){
    for(let i =0; i<daysData.days.length; i++)
    {
    console.log(hourlyData);
    let daysCard = createHourlyCard(hourlyData.hours[i], hourlyData.hoursTemps[i], hourlyData.hoursIcons[i]);
    daysContainer.appendChild(daysCard);
    }
}

function addFavoriteCard(isTrue, cityAdd){
    let favoritesContainer = document.getElementById('favorites-container');
    let addFavorite = createFavoritesCards(cityAdd)
    let removeFavorite = document.getElementById(cityAdd);
    

    isTrue? favoritesContainer.removeChild(removeFavorite): favoritesContainer.appendChild(addFavorite);
}

function deleteFavoriteCard(){
    let removeFavoriteCard = document.getElementsByClassName('removeFavorite');

    Object.entries(removeFavoriteCard).map(item => {
     item[1].addEventListener('click', function(){
        this.parentNode.remove();
        removeFromLocalStorage(this.parentNode.id.toLowerCase());
        heartFavorite.checked=false; 
        heartMsg.textContent='Add to Favorites'; 
     })
    });
}


// EVENT LISTENERS
searchCityBtn.addEventListener('click', cityUserInput);
heartFavorite.addEventListener('change', function(e){
    addRemoveToFavorite(e.target.checked);
})
hourlyDailyToggle.addEventListener('change', function(e){
    console.log(e.target.checked);
    hourlyDailySwitch(e.target.checked)
})

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