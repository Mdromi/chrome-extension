const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

// Set initial value for the time input
chrome.storage.local.get(["timeOption"], (result) => {
  timeInput.value = result.timeOption;
  updateButtonState(); // Set initial button state
});

timeInput.addEventListener("change", (event) => {
  const value = event.target.value;
  if (value < 1 || value > 120) {
    timeInput.value = 25;
  }

  // Update button state when the time input changes
  updateButtonState(false);
});

saveBtn.addEventListener("click", () => {
  const timeOption = timeInput.value;

  // Set button state to "Saved"
  updateButtonState();

  chrome.storage.local.set({ timer: 0, timeOption, isRunning: false });
});

// Function to update button state
function updateButtonState(saved = true) {
  saveBtn.textContent = saved ? "Saved" : "Save";
  saveBtn.disabled = saved;
  saveBtn.style.cursor = saved ? "not-allowed" : "pointer";
}
