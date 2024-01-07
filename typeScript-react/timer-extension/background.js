chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunnig"], (result) => {
    const time = result.timer ?? 0;
    const isRunning = result.isRunnig ?? true;

    if (!isRunning) return;

    // Increment the timer in seconds
    chrome.storage.local.set({
      timer: time + 1,
    });

    // Convert the total time to hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Format the badge text to display hours, minutes, and seconds
    const badgeText = `${hours > 0 ? hours + "h " : ""}${
      minutes > 0 ? minutes + "m " : ""
    }${seconds}s`;

    // Set the badge text
    chrome.action.setBadgeText({
      text: badgeText,
    });

    chrome.storage.sync.get(["notificationTime"], (result) => {
      const notificationTime = result.notificationTime ?? 60; // Assuming notification time is in seconds

      // Convert notificationTime to seconds
      const notificationTimeInSeconds = notificationTime * 60;

      if (time % notificationTimeInSeconds === 0) {
        const minutesPassed = Math.floor(time / 60);
        const hoursPassed = Math.floor(minutesPassed / 60);

        this.registration.showNotification("Chrome Timer Extension", {
          body: `${hoursPassed} hour(s) and ${
            minutesPassed % 60
          } minute(s) have passed!`,
          icon: "./icon.png",
        });
      }
    });
  });
});

// chrome.alarms.onAlarm.addListener((alerm) => {
//   chrome.storage.local.get(["timer", "isRunnig"], (result) => {
//     const time = result.timer ?? 0;
//     const isRunnig = result.isRunnig ?? true;
//     if (!isRunnig) return;
//     chrome.storage.local.set({
//       timer: time + 1,
//     });
//     chrome.action.setBadgeText({
//       text: `${time + 1}`,
//     });
//     chrome.storage.sync.get(["notificationTime"], (result) => {
//       const notificationTime = result.notificationTime ?? 1000;
//       if (time % notificationTime === 0) {
//         this.registration.showNotification("Chrome Timer Extension", {
//           body: `${notificationTime} second is passed!`,
//           icon: "./icon.png",
//         });
//       }
//     });
//   });
// });
