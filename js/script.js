const userTime = document.querySelector('.time');
const userDate = document.querySelector('.date');
const userGreeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const documentBody = document.body;
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherInput = document.querySelector('.city');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    userTime.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}
function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-RU', options);
    userDate.textContent = currentDate;
}
function showGreeting() {
    const timeOfDay = getTimeOfDay();
    userGreeting.textContent = `Good ${timeOfDay}`;
}
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if(hours>=5 && hours<=11) {
        return 'morning';
    } else if(hours>=12 && hours<=17) {
        return 'day';
    } else if(hours>=18 && hours<=22) {
        return 'evening';
    } else if(hours>=23 && hours<=4) {
        return 'night';
    }
}
function getRandomNum() {
    return randomNum = String(Math.floor(Math.random() * (21 - 1) + 1)).padStart(2, '0');
}
function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = getRandomNum();
    documentBody.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}
function getSlideNext() {
    if(randomNum <= 19){
        randomNum++;
    }else {
        randomNum = 1;
    }
    setBg();
}
function getSlidePrev() {
    if(randomNum >= 2){
        randomNum--;
    }else {
        randomNum = 20;
    }
    setBg();
}
function setLocalStorage() {
    localStorage.setItem('name', userName.value);
}
function getLocalStorage() {
    if(localStorage.getItem('name')) {
      userName.value = localStorage.getItem('name');
    }else {
        userName.value = '';
    }
}
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&lang=ru&appid=898c5bf5baf4fa9541b2e85c88d43cab&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather()

setBg();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
weatherInput.addEventListener('change', getWeather);
showTime();