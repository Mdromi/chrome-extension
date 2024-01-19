const timeElement = document.getElementById("time");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

// Function to update the time elements on the popup
function updateTimeElement() {
  chrome.storage.local.get(["timer"], (result) => {
    const time = result.timer ?? 0;
    console.log("time", time);

    // Convert the total time to hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Ensure consistent naming for the secondsElement
    secondsElement.textContent = seconds <= 9 ? `0${seconds}` : seconds;
    minutesElement.textContent = minutes <= 9 ? `0${minutes}` : minutes;
    hoursElement.textContent = hours <= 9 ? `0${hours}` : hours;
  });

  // Update the current time element
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `${currentTime}`;
}

// Initial update and set up interval for continuous updates
updateTimeElement();
setInterval(updateTimeElement, 1000);

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
