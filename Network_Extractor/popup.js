// document.addEventListener('DOMContentLoaded', function () {
//   var extractButton = document.getElementById('extractButton');
//   if (extractButton) {
//     extractButton.addEventListener('click', function () {
//       console.log("Button Clicked");

//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var tabId = tabs[0].id;

//         // Attach to the current tab
//         chrome.debugger.attach({ tabId: tabId }, '1.3', function() {
//           // Enable the Network domain
//           chrome.debugger.sendCommand({ tabId: tabId }, 'Network.enable', {}, function() {
//             // Listen for network events
//             chrome.debugger.onEvent.addListener(function (debuggeeId, message, params) {
//               if (message == 'Network.responseReceived') {
//                 var url = params.response.url;
//                 if (url.endsWith('.m3u8')) {
//                   console.log('M3U8 file requested:', url);
//                 }
//               }
//             });

//             // Reload the tab to capture network requests
//             chrome.tabs.reload(tabId, { bypassCache: true }, function() {
//               // Detach from the tab after reload
//               chrome.debugger.detach({ tabId: tabId });
//             });
//           });
//         });
//       });
//     });
//   } else {
//     console.error("Element with ID 'extractButton' not found.");
//   }
// });

// popup.js
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('downloadButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'downloadVideo' }, function (response) {
        console.log("Response from content script:", response);
        // Handle the response from the content script as needed
      });
    });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request", request.item);
  if (request.action === 'videoDownloaded') {
    console.log('Video downloaded:', request.videoUrl);

    // Respond to the content script with additional data
    sendResponse({ success: true, message: 'Video download successful' });

    // If you need to perform asynchronous operations, you can return true
    // and call sendResponse later. However, in this example, we respond synchronously.
    return true;
  }
});
