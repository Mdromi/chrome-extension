chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {action: "getReadingTime"}, function(response) {
    console.log(response.time);
  });
});