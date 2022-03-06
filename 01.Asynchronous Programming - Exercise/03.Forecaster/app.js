let url = "http://localhost:3030/jsonstore/forecaster/locations";
let locationElement = document.getElementById('location');

let forecastElement = document.getElementById('forecast');
let currentConditions = document.getElementById('current');
let upcomingConditions = document.getElementById('upcoming');

const wetherSymbols = {
    'Sunny': '&#x2600',
    'PartlySunny': '&#x26C5',
    'Overcast': '&#x2601',
    'Rain': '&#x2614',
    'Degrees': '&#176',
}

async function solution() {

    let currentLocation = '';
    
    try {
        clearChildren();
        //First request
        let firstResponse = await fetch(url);
        isValidStatus(firstResponse.status);
        let firstResponseData = await firstResponse.json();
        currentLocation = firstResponseData.find(x => x.name === locationElement.value);
        if (!currentLocation) {
            throw new Error('Invalid location');
        }
        console.log(firstResponseData);
        //Second request
        let secondResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${currentLocation.code}`);
        isValidStatus(secondResponse.status);
        let secondResponseData = await secondResponse.json();

        let divForcasts = document.createElement('div');
        divForcasts.classList.add('forcasts');

        let symbolSpan = document.createElement('span');
        symbolSpan.classList.add('condition');
        symbolSpan.classList.add('symbol');
        let condition = secondResponseData.forecast.condition;
        symbolSpan.innerHTML = wetherSymbols[condition];

        let conditionSpan = document.createElement('span');
        conditionSpan.classList.add('condition');

        let citySpan = document.createElement('span');
        citySpan.classList.add('forecast-data');
        citySpan.textContent = secondResponseData.name;

        let degreesSpan = document.createElement('span');
        degreesSpan.classList.add('forecast-data');
        let degreesSymbol = wetherSymbols.Degrees;
        degreesSpan.innerHTML = `${secondResponseData.forecast.low}${degreesSymbol}/${secondResponseData.forecast.high}${degreesSymbol}`

        let typeTimeSpan = document.createElement('span');
        typeTimeSpan.classList.add('forecast-data');
        typeTimeSpan.textContent = secondResponseData.forecast.condition;

        conditionSpan.appendChild(citySpan);
        conditionSpan.appendChild(degreesSpan);
        conditionSpan.appendChild(typeTimeSpan);

        divForcasts.appendChild(symbolSpan);
        divForcasts.appendChild(conditionSpan);

        currentConditions.appendChild(divForcasts);

        //Third request
        let thirdResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${currentLocation.code}`);
        isValidStatus(thirdResponse);
        let thirdResponseData = await thirdResponse.json();

        let divUpComing = document.createElement('div', 'forecast-info');
        
        for (const current of thirdResponseData.forecast) {

            let spanUpComing = document.createElement('span', 'upcoming');
            
            let symbolElement = document.createElement('span');
            symbolElement.classList.add('symbol');
            symbolElement.innerHTML = wetherSymbols[current.condition];

            let degreesElement = document.createElement('span');
            degreesElement.classList.add('forecast-info');
            let degreeSymbol = wetherSymbols.Degrees;
            degreesElement.innerHTML = `${current.low}${degreeSymbol}/${current.high}${degreeSymbol}`; 

            let type = document.createElement('span');
            type.classList.add('forecast-info');
            type.textContent = current.condition;

            spanUpComing.appendChild(symbolElement);
            spanUpComing.appendChild(degreesElement);
            spanUpComing.appendChild(type);

            divUpComing.appendChild(spanUpComing);
        }

        upcomingConditions.appendChild(divUpComing);
        forecastElement.style.display = 'block';

    }
    catch (error) {

        clearChildren();
        let liErrorElement = document.createElement('li');
        liErrorElement.classList.add('label');
        liErrorElement.textContent = error.message;
        forecastElement.style.display = 'block';
        currentConditions.appendChild(liErrorElement);
    }
}

function clearChildren() {
    let currCondition = currentConditions.children[0];
    let upComing = upcomingConditions.children[0];

    while (currCondition && currCondition.nextSibling) {
        currCondition.parentNode.removeChild(currCondition.nextSibling);
    }

    while (upComing && upComing.nextSibling) {
        upComing.parentNode.removeChild(upComing.nextSibling);
    }
}

function isValidStatus(status) {
    if (status.ok == false) {
        throw new Error('Invalid status');
    }
}

function attachEvents() {
    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', solution);
}

attachEvents();