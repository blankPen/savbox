import { snapshotWithConfig } from "./snapshot/index";

function setStatus(obj) {
  iframe.style.display = "block";
  //   sendMessage(obj);
  return chrome.runtime.sendMessage({
    type: "updateMessageBox",
    data: obj,
  });
}

const handleMessage = async (request, _sender, sendResponse) => {
  const { type, data } = request;
  console.log(request);
  if (type === "snapshot") {
    await setStatus({ type: "loading" });
    try {
      const res = await snapshotWithConfig();
      await setStatus({ type: "success", data: res });
      sendResponse();
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", data: error.message });
      sendResponse();
    }
  }
  if (type === "hideMessageBox") {
    iframe.style.display = "none";
    sendResponse();
  }
  if (type === "resizeMessageBox") {
    iframe.style.height = `${data}px`;
    sendResponse();
  }
};

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  handleMessage(request, _sender, sendResponse);
  return true;
});

const iframe = document.createElement("iframe");
iframe.id = "chrome-extension-snapshot-root";
iframe.src = chrome.runtime.getURL("/src/pages/popup/index.html");
iframe.style.display = "none";
iframe.style.height = "0px";
document.body.appendChild(iframe);
