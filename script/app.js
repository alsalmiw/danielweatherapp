import {fetchCityNowData, todaysData, daysData, hourlyData, errorCode} from './fetch.js';
import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from './localStorage.js';
import {getLocation} from './geolocation.js';
import {createDailyCard, createHourlyCard, createFavoritesCards} from './components.js';

let searchCityInput = document.getElementById('searchInput'),
searchCityBtn = document.getElementById('submitBtn'),
heartFavorite = document.getElementById('heart'),
heartMsg=document.getElementById('heartMsg'),
daysContainer=document.getElementById('daysContainer'),
hourlyDailyToggle=document.getElementById('hourlyToggle');
let city;
let favoriteCities =getLocalStorage();
firstTimeIntoSite();
searchFromFavorites();
deleteFavoriteCard();


// CHECK GEOLOCATION IF FAVORITES ARE EMPTY (DEFAULT CITY FOR ERROR IS LONDON)
function firstTimeIntoSite(){
    if (favoriteCities=[]){
        getLocation();
        getFetchedData();
    }
    else{
        getFavorites();
    }
}

//CHECK FAVORITES TO SEE IF IT IS EMPTY. IF NOT THE RETURN IS THE FIRST CITY FROM LIST
function getFavorites(){
    findCity(favoriteCities[0])
    favoriteCities.forEach(element => {
        if (!element=='')
        {
            addFavoriteCard(false, element.toUpperCase());
            checkUncheckHeart(true);
        }
    });
}

// RUN THE FETCHES FOR INFO ON WEATHER
function getFetchedData(){
    setTimeout(() => {
        if (errorCode==true){
            searchCityInput.classList.add('errorBorder');
            searchCityInput.value='';
            searchCityInput.placeholder='City name not found';
        }
        else{
            searchCityInput.className='searchTerm';
            searchCityInput.placeholder='Enter City Name';
            searchCityInput.value='';
             console.log(todaysData);
            console.log(daysData);
            console.log(hourlyData);
            addTodayWeather();
            DayCards();
            document.body.style.backgroundImage= `url('https://source.unsplash.com/1620x900/?${todaysData.city}')`;
                }
            }, 2000);        
}

// GET CITY WEATHER INFORMATION THROUGH: SEARCH BAR OR CLICKING ON FAVORITE CITIES
function searchFromFavorites(){
    let favoriteCities=document.getElementsByClassName('favorite-city');
    
    Object.entries(favoriteCities).map(item => {
     item[1].addEventListener('click', function(){
        findCity(item[1].textContent.toLowerCase())
        checkUncheckHeart(true);
        console.log(item[1].textContent.toLowerCase());
     })
    });
}

function searchCityUserInput(){
    findCity(searchCityInput.value);
    
    if(favoriteCities.includes(searchCityInput.value) || errorCode==true){
        checkUncheckHeart(true);
    }
    else{
        checkUncheckHeart(false);
    }
}

function findCity(cityName){
    fetchCityNowData(cityName);
    getFetchedData();
}

// HOURLY TO DAILY TOGGLE CONTROLLER
function hourlyDailySwitch(isHourly){
    isHourly?  removeDaysCards(): removeDaysCards();
    isHourly? addHourlyCards():addDayCards();
}

//FAVORITES FUNCTIONS AND ADDING & DELETING FAVORITE CARDS
function addRemoveToFavorite(isTrue){
    let displayedCity = document.getElementById('city').textContent.toUpperCase();
    isTrue? saveToLocalStorage(displayedCity): removeFromLocalStorage(displayedCity);
    isTrue? heartMsg.textContent='Remove Favorite': heartMsg.textContent='Add to Favorites';
    isTrue? addFavoriteCard(false, displayedCity): addFavoriteCard(true, displayedCity);
    isTrue? createFavoritesCards(displayedCity): null;  
    deleteFavoriteCard();
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
        if(todaysData.city.toLowerCase() == this.parentNode.id.toLowerCase()){
             checkUncheckHeart(false);
        }
     })
    });
}

function checkUncheckHeart(isTrue){
    isTrue?heartMsg.textContent='Remove Favorite':  heartMsg.textContent='Add to Favorites'; 
    isTrue? heartFavorite.checked=true:heartFavorite.checked=false; 
}

// CREATE ELEMENTS AND ADD INFO TO CARDS
function addTodayWeather(){
    let todayInfoPlacement=['city', 'temperature', 'clearity', 'humidity', 'wind', 'feelsLike', 'todayIcon'];

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

function addHourlyCards(){
    for(let i =0; i<daysData.days.length; i++)
    {
    let daysCard = createHourlyCard(hourlyData.hours[i], hourlyData.hoursTemps[i], hourlyData.hoursIcons[i]);
    daysContainer.appendChild(daysCard);
    }
}

// EVENT LISTENERS
searchCityBtn.addEventListener('click', searchCityUserInput);
heartFavorite.addEventListener('change', function(e){
    addRemoveToFavorite(e.target.checked);
})
hourlyDailyToggle.addEventListener('change', function(e){
    hourlyDailySwitch(e.target.checked)
})
