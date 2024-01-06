const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTimeElement() {
  chrome.storage.local.get(["timer"], (result) => {
    const time = result.timer ?? 0;
    timerElement.textContent = `The timer is at ${time} second`;
  });

  const currrentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The Time Is: ${currrentTime}`;
}

updateTimeElement();
setInterval(updateTimeElement, 1000);

// chrome.action.setBadgeText(
//   {
//     text: "TIME",
//   },
//   () => {
//     console.log("Finshed setting badge text");
//   }
// );

chrome.storage.sync.get(["name"], (result) => {
  const name = result.name ?? "???";
  nameElement.textContent = `Your name is: ${name}`;
});

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
