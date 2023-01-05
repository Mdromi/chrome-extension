chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getReadingTime") {
    var time = 0;
    // Calculate the reading time here and assign it to the `time` variable
    sendResponse({time: time});
  }
});
