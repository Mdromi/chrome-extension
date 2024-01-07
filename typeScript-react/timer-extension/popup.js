const timeElement = document.getElementById("time");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTimeElement() {
  chrome.storage.local.get(["timer"], (result) => {
    const time = result.timer ?? 0;

    // Convert the total time to hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    hoursElement.textContent = hours <= 9 ? `0${hours}` : hours;
    minutesElement.textContent = minutes <= 9 ? `0${minutes}` : minutes;
    secondElement.textContent = seconds <= 9 ? `0${seconds}` : seconds;
  });

  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `${currentTime}`;
}

updateTimeElement();
setInterval(updateTimeElement, 1000);

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunnig: true,
  });
});
stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunnig: false,
  });
});
resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunnig: false,
  });
});
