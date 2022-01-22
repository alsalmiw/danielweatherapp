let favorites=[];

function saveToLocalStorage(cityName)
{
    favorites.push(cityName);
    amendLocalStorage();
}

function removeFromLocalStorage(cityName){
    let cityIndex = favorites.indexOf(cityName);
    favorites.splice(cityIndex, 1);
    amendLocalStorage();
}

function amendLocalStorage(){
    localStorage.setItem('Favorite Cities', JSON.stringify(favorites))
}

function getLocalStorage(){
    favorites = JSON.parse(localStorage.getItem('Favorite Cities'));
    return favorites;
}

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage}