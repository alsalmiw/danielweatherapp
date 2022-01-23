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
    const localStorageItem = localStorage.getItem('Favorite Cities');
    localStorageItem != null ? favorites = JSON.parse(localStorageItem) : favorites = [];
    return favorites;
}

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage}