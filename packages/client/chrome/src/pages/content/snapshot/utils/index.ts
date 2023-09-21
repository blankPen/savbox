import { copyComputedStyle } from "./css";
import { replaceTag } from "./dom";
export * from "./hash";
export * from "./dom";

export async function urlToBlob(url) {
  try {
    const response = await fetch(url);
    return response.blob();
  } catch (err) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      img.src = url;
    });
  }
}

// Blob 转 Base64
export function blobToDataURL(blob) {
  return new Promise((resolve) => {
    let a = new FileReader();
    a.onload = function (e) {
      resolve(e.target.result);
    };
    a.readAsDataURL(blob);
  });
}

// export async function urlToLink(url) {
//   try {
//     const blob = (await urlToBlob(url)) as Blob;
//     const name = getHash(url);
//     // const file = new File([blob], name, { type: blob.type });
//     const res = await uploadFile({
//       Bucket: "images-1318918047" /* 填写自己的 bucket，必须字段 */,
//       Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
//       Key: `images/${name}` /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
//       //   Body: file, // 上传文件对象
//       file: {
//         base64: await blobToDataURL(blob),
//         type: blob.type,
//       },
//     });
//     return `https://${res.Location}`;
//   } catch (err) {
//     console.info(url, err);
//     return url;
//   }
// }

export const snapshotDom = async (
  host: Element,
) => {
  const cloneNode = async (node, parent) => {
    const walkTree = async (nextn, nextp) => {
      while (nextn) {
        await cloneNode(nextn, nextp);
        nextn = nextn.nextSibling;
      }
    };

    if (node.id === "chrome-extension-snapshot-root") return null;
    if (node.tagName === "SCRIPT") return null;
    let clone = node.cloneNode();

    if (!clone) return;

    if (clone.nodeType === Node.ELEMENT_NODE) {
      Array.from(clone.attributes).forEach((v: any) => {
        v.name.startsWith("data-") && v.ownerElement.removeAttribute(v.name);
      });
      copyComputedStyle(clone, node);
    }
    parent.appendChild(clone);
    if (node.shadowRoot) await walkTree(node.shadowRoot.firstChild, clone);
    await walkTree(node.firstChild, clone);
  };

  const fragment = document.createDocumentFragment();
  await cloneNode(host, fragment);

  // 修复 p 和 div标签嵌套导致HTML结构错误问题
  fragment.querySelectorAll("p div").forEach((v) => replaceTag(v, "view"));
  return fragment.firstChild as HTMLElement;
};
