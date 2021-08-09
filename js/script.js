
const userTime = document.querySelector('.time');
const userDate = document.querySelector('.date');
const userGreeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');

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
  
  
  
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
showTime();