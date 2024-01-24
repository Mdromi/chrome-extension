const timeElement = document.getElementById("time");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

// Function to update the time elements on the popup
function updateTimeElement() {
  chrome.storage.local.get(["timer", "timeOption"], (res) => {
    const totalMinutes = res.timeOption - Math.ceil(res.timer / 60);
    const hours = `${Math.floor(totalMinutes / 60)}`.padStart(2, "0");
    const minutes = `${totalMinutes % 60}`.padStart(2, "0");
    let seconds = "00";

    if (res.timer % 60 !== 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }

    secondsElement.textContent = seconds;
    minutesElement.textContent = minutes;
    hoursElement.textContent = hours;

    // Update the current time element
    const currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = `${currentTime}`;
  });
}

// Initial update and set up interval for continuous updates
updateTimeElement();
setInterval(updateTimeElement, 1000);

chrome.storage.local.get(["isRunning"], (res) => {
  startBtn.textContent = res.isRunning ? "Puse Timer" : "Start Timer";
});

// Event listeners for the buttons
startBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startBtn.textContent = !res.isRunning ? "Puse Timer" : "Start Timer";
      }
    );
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startBtn.textContent = "Start Timer";
    }
  );
});
