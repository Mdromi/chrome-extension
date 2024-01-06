chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alerm) => {
  chrome.storage.local.get(["timer", "isRunnig"], (result) => {
    const time = result.timer ?? 0;
    const isRunnig = result.isRunnig ?? true;
    if (!isRunnig) return;
    chrome.storage.local.set({
      timer: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    chrome.storage.sync.get(["notificationTime"], (result) => {
      const notificationTime = result.notificationTime ?? 1000;
      if (time % notificationTime === 0) {
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} second is passed!`,
          icon: "./icon.png",
        });
      }
    });
  });
});
