import COS from "cos-js-sdk-v5";
export const EventMap = new Map<string, (data, sender) => any>();

const handleMessage = async (request, _sender, sendResponse) => {
  console.log("==>>>pop onMessage", request);
  const { type, data } = request;
  if (EventMap.has(type)) {
    try {
      sendResponse({
        data: (await EventMap.get(type).call(null, data, _sender)) || "ok",
      });
    } catch (error) {
      console.log("===>", error);
      sendResponse({ error: error.message });
    }
  }
};
chrome.runtime.onMessage.addListener((t, _sender, sendResponse) => {
  handleMessage(t, _sender, sendResponse);
  return true;
});

async function getCOSInstance() {
  if (globalThis.cos) return globalThis.cos;
  const { snapshot_config } = await chrome.storage.local.get("snapshot_config");
  if (snapshot_config) {
    const { oss, SecretId, SecretKey, Bucket, Region } = snapshot_config;
    if (oss === "tencent" && SecretId && SecretKey && Bucket && Region) {
      // @ts-ignore
      const cos = new COS({
        //   SecretId: "AKID8B6q2CB93nKer6EArLhu4CMLBsR1bSCk",
        //   SecretKey: "UmplfVBh2963BGCuUt7A90iDTaWIuOk9",
        SecretId,
        SecretKey,
        // @ts-ignore
        // Request: request,
        SliceSize: 1024 * 1024 * 20,
      });

      const bucketOpts = {
        Bucket,
        Region,
      };

      globalThis.cos = {
        uploadFile(opt) {
          return cos.uploadFile({
            ...bucketOpts,
            ...opt,
          });
        },
        getObject(opt) {
          return cos.getObject({
            ...bucketOpts,
            ...opt,
          });
        },
      };
      console.log("=====222", globalThis.cos);
      return globalThis.cos;
    }
  }

  return null;
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

async function handleUploadFile(data) {
  console.log("handleUploadFile", data);
  const cos = await getCOSInstance();
  if (!cos) return;
  const { file, key, ...rest } = data;
  let Body;
  if (file.dataURL) {
    Body = dataURLtoFile(file.dataURL, "test");
  } else {
    Body = new File([file.content], "test", { type: file.type });
  }
  const res = await cos.uploadFile({
    Body,
    // Bucket: "images-1318918047" /* 填写自己的 bucket，必须字段 */,
    // Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
    Key: key /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
    ...rest,
  });
  return {
    statusCode: res.statusCode,
    ETag: res.ETag,
    Location: res.Location,
  };
}

async function handleCheckOptions() {
  console.log("handleCheckOptions");
  const cos = await getCOSInstance();
  if (!cos) {
    chrome.runtime.openOptionsPage();
    throw new Error("快照生成失败，请先完成设置");
  }
}

EventMap.set("checkOptions", handleCheckOptions);
EventMap.set("uploadFile", handleUploadFile);

EventMap.set("saveResult", async (res) => {
  console.log("saveResult", res);
  const cos = await getCOSInstance();
  const Key = "post/list.json";

  let result = [];
  try {
    const object = await cos.getObject({
      //   Bucket: "images-1318918047",
      //   Region: "ap-beijing",
      Key,
    });
    console.log('saveResults', object);
    result = JSON.parse(object.Body);
  } catch (error) {
    console.log(error)
  }

  result.push({
    title: res.title,
    desc: res.desc || "",
    banner: res.banner || "",
    originUrl: res.sourceUrl,
    url: res.outputUrl,
    tags: res.tags || [],
  });

  console.log("saveResult2", result);
  const res2 = await cos.uploadFile({
    Key,
    Body: new File([JSON.stringify(result)], "result", {
      type: "application/json",
    }),
    // Bucket: "images-1318918047" /* 填写自己的 bucket，必须字段 */,
    // Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
  });
  console.log("saveResult3", res2);
});
