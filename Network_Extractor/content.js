chrome.runtime.sendMessage({ action: 'contentScriptLoaded' });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'extractM3U8Urls') {
    // Extract URLs and send them to the background script
    const m3u8Urls = Array.from(document.querySelectorAll('a[href$=".m3u8"]')).map(a => a.href);
    chrome.runtime.sendMessage({ action: 'm3u8UrlsExtracted', m3u8Urls });
  }
});
