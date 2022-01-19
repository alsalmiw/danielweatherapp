function fetchLonLat(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=15adc6353eb69144e59e8cdfa7ee8626`)
    .then(response => response.json())
    .then(data => console.log(data));
}

function fetchCity(city){
    fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=15adc6353eb69144e59e8cdfa7ee8626`)
    .then(response => response.json())
    .then(data => console.log(data));
}


export {fetchLonLat, fetchCity}