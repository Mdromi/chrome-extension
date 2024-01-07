const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const notificationTime = timeInput.value;
  chrome.storage.sync.set({ notificationTime });
});

chrome.storage.sync.get(["name", "notificationTime"], (result) => {
  timeInput.value = result.notificationTime ?? 1;
});
