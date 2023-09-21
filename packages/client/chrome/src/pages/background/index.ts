// import COS from "cos-js-sdk-v5";
// import request from "./request";
console.log("background loaded 111222");

// async function getCOSInstance() {
//   if (globalThis.cos) return globalThis.cos;
//   const { snapshot_config } = await chrome.storage.local.get("snapshot_config");
//   console.log("=====", snapshot_config);
//   if (snapshot_config) {
//     const { oss, SecretId, SecretKey } = snapshot_config;
//     if (oss === "tencent" && SecretId && SecretKey) {
//       globalThis.cos = new COS({
//         //   SecretId: "AKID8B6q2CB93nKer6EArLhu4CMLBsR1bSCk",
//         //   SecretKey: "UmplfVBh2963BGCuUt7A90iDTaWIuOk9",
//         SecretId,
//         SecretKey,
//         // @ts-ignore
//         Request: request,
//         SliceSize: 1024 * 1024 * 20,
//       });
//       return globalThis.cos;
//     }
//   }

//   return null;
// }

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    { from: "background.js", type: "snapshot" },
    (response) => {
      console.log(
        "background -> content script infos have been sended",
        response
      );
    }
  );
});

// function dataURLtoFile(dataurl, filename) {
//   var arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// }

// async function handleUploadFile(data) {
//   const cos = await getCOSInstance();
//   if (!cos) return;
//   const { file, ...rest } = data;
//   console.log("uploadFIle", file);
//   let Body;
//   if (file.base64) {
//     Body = dataURLtoFile(file.base64, "test");
//   } else {
//     Body = new File([file.content], "test", { type: file.type });
//   }
//   const res = await cos.uploadFile({ Body, ...rest });
//   return {
//     data: {
//       statusCode: res.statusCode,
//       ETag: res.ETag,
//       Location: res.Location,
//     },
//   };
// }

// async function handleCheckOptions() {
//   const cos = await getCOSInstance();
//   if (!cos) {
//     chrome.runtime.openOptionsPage();
//     return { error: "快照生成失败，请先完成设置" };
//   }
// }

// const EventMap = {
//   uploadFile: handleUploadFile,
//   checkOptions: handleCheckOptions,
// };

// const handleMessage = async (request, _sender, sendResponse) => {
//   const { type, data } = request;
// //   console.log("request", request);
//   try {
//     // if (EventMap[type]) {
//     //   sendResponse(await EventMap[type].call(null, data));
//     // }
//   } catch (error) {
//     console.log(error);
//     sendResponse({ error: error.message });
//   }
// };

// chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
//   handleMessage(request, _sender, sendResponse);
//   return true;
// });
