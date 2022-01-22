
// CREATING ELEMENTS
let element;
function createElementClassIdText(element, elementID, nameClass, text){
    element = document.createElement(element);
    element.className = nameClass;
    element.id=elementID;
    element.textContent=text;
    return element;
}

function createElementClassText(element, elementClass, text){
    element = document.createElement(element);
    element.className=elementClass;
    element.textContent=text;
    return element;
}

function createElementClassID(element, elementClass, elementID){
    element = document.createElement(element);
    element.className=elementClass;
    element.id=elementID;
    return element;
}

function createElementTextID(element, elementID, text){
    element = document.createElement(element);
    element.id=elementID;
    element.textContent=text;
    return element;
}

function createElementClass(element,elementClass){
    element = document.createElement(element);
    element.className=elementClass;
    return element;
}

function createElementClassSrc(element, elementClass, elementSrc){
    element = document.createElement(element);
    element.className=elementClass;
    element.src=elementSrc;
    return element;
}

function createElementText(element, text){
    element = document.createElement(element);
    element.textContent=text;
    return element;
}

// CREATE CARD FOR DAILY WEATHER

function createDailyCard(daysNames, daysIcons, daysHigh, daysLow, i){
   let pHigh= createElementTextID('p',`tempHigh${i}`, `${daysHigh}°C`);
   let pLow= createElementTextID('p',`tempLow${i}`, `${daysLow}°C`);
    let tempDiv = createElementClass('div', 'temp-high-low');
   tempDiv.appendChild(pHigh);
   tempDiv.appendChild(pLow);

    let iconSrc = `http://openweathermap.org/img/wn/${daysIcons}@2x.png`;
   let icon = createElementClassSrc('img','dayIcon', iconSrc);
   let h3 =createElementTextID('h3', `dayName${i}`, daysNames)

    let cardDiv = createElementClass('div', 'days-card');
    cardDiv.appendChild(h3);
    cardDiv.appendChild(icon);
    cardDiv.appendChild(tempDiv)

    return cardDiv
}

function createHourlyCard(nextHours, nextTemp, nextIcon){
    let tempP=createElementText('p', `${nextTemp}°C`);
    let tempDiv = createElementClass('div', 'temp-high-low text-center');
    tempDiv.appendChild(tempP);
    let iconSrc = `http://openweathermap.org/img/wn/${nextIcon}@2x.png`;
   let icon = createElementClassSrc('img','dayIcon', iconSrc);
   let h3 =createElementText('h3', nextHours)

    let cardDiv = createElementClass('div', 'days-card');
    cardDiv.appendChild(h3);
    cardDiv.appendChild(icon);
    cardDiv.appendChild(tempDiv)

    return cardDiv
}

// CREATE CARD FOR FAVORITE CITIES
function createFavoritesCards(favoriteCity){
    let h4=createElementText('h4', favoriteCity);
    let removeIcon=createElementClassID('i', 'far fa-times-circle removeFavorite', `${favoriteCity}Icon`);
    let favoriteCard=createElementClassID('div', 'favorites-card', favoriteCity);
    favoriteCard.appendChild(removeIcon);
    favoriteCard.appendChild(h4);

    return favoriteCard;
}

export {createDailyCard, createHourlyCard, createFavoritesCards};