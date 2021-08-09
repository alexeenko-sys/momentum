
const userTime = document.querySelector('.time');
const userDate = document.querySelector('.date');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    userTime.textContent = currentTime;
    showDate();
    setTimeout(showTime, 1000);
}
function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-RU', options);
    userDate.textContent = currentDate;
    setTimeout(showDate, 1000)
}



showTime();