import {
  blobToDataURL,
  urlToBlob,
  snapshotDom,
  compressHTMLStyle,
  hash,
} from "./utils";

function createUploader(uploadFn) {
  const uploadFile = async (key, blob) =>
    uploadFn({
      key,
      file: {
        type: blob.type,
        dataURL: await blobToDataURL(blob),
      },
    });

  return {
    async uploadImage(url) {
      try {
        const blob = await urlToBlob(url);
        return await uploadFile(`images/${hash(url)}`, blob);
      } catch (err) {
        return url;
      }
    },
    async uploadHTML(key, html) {
      const blob = new Blob([html], { type: "text/html" });
      return uploadFile(key, blob);
    },
  };
}

export async function snapshot(sourceDOM, options: any = {}) {
  const { upload } = options;
  const uploader = createUploader(upload);

  // 深拷贝dom
  let record = await snapshotDom(sourceDOM);

  // 处理所有图片，保存到远端生成新的链接
  await Promise.all(
    [...record.querySelectorAll("img")].map(async (img) => {
      img.src = await uploader.uploadImage(img.src);
    })
  );

  const contentHTML = compressHTMLStyle(
    record.tagName !== "body" ? record.outerHTML : record.innerHTML
  );

  const title = document.title;
  const desc =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content") ||
    record.innerText.replace(/[\r\n]/g, " ").slice(0, 200);

  const outputHTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link href="https://unpkg.com/reset-css@5.0.1/reset.css" rel="stylesheet">
        </head>
        <body>${contentHTML}</body></html>`;

  const outputUrl = await uploader.uploadHTML(
    `post/${location.hostname}${location.pathname}`,
    outputHTML
  );

  const result = {
    title: title,
    desc,
    tags: [],
    banner: record.querySelector("img")?.src || "",
    sourceUrl: location.href,
    outputUrl,
    outputHTML,
  };
  return result;
}
