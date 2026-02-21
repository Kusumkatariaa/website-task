function selector(id) {
    return document.getElementById(id);
}

let hoursText = selector("hours");
let minutesText = selector("minutes");
let secondsText = selector("seconds");

function updateTimer() {
    let now = new Date();
    let currentHours = now.getHours() % 12;
    let currentMinutes = now.getMinutes();
    let currentSeconds = now.getSeconds();

    hoursText.textContent = `${currentHours}`.padStart(2, '0');
    minutesText.textContent = `${currentMinutes}`.padStart(2, '0');
    secondsText.textContent = `${currentSeconds}`.padStart(2, '0');
}
updateTimer();
setInterval(updateTimer, 1000);