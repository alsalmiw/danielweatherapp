// let personData = {
//     name: 'Walaa',
//     email: 'alsalmiw@gmail.com'
// }
//console.log(personData);
//localStorage.setItem('peopleData', JSON.stringify(personData))
// localStorage.clear('peopleData')

// let personDataInfo = JSON.parse(localStorage.getItem('peopleData'));

// export {personDataInfo};

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
    //console.log(localStorageData);
    return favorites;
}

// saveToLocalStorage();

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage}