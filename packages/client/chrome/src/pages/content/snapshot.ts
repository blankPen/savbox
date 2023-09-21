import { minimatch } from "minimatch";
import styleToObject from "style-to-object";
import { checkOptions, deepClone, scrollTo, uploadFile } from "./utils";

function replaceTag(oldElement, newTag) {
  var newElement = document.createElement(newTag);
  // 复制原始元素的所有属性
  for (var j = 0; j < oldElement.attributes.length; j++) {
    var attr = oldElement.attributes[j];
    newElement.setAttribute(attr.name, attr.value);
  }
  // 复制原始元素的所有子元素
  while (oldElement.firstChild) {
    newElement.appendChild(oldElement.firstChild);
  }
  // 将新元素插入到原始元素的父元素中，并将原始元素从父元素中删除
  oldElement.parentNode.insertBefore(newElement, oldElement);
  oldElement.parentNode.removeChild(oldElement);
}

const filter = (node) => {
  if (node.tagName === "SCRIPT") return false;
  if (node.id === "chrome-extension-snapshot-root") return false;

  return true;
};

let n = 0;
let getId = () => {
  const i = Math.floor(n % 24);
  const j = Math.floor(n / 24);
  let s = String.fromCharCode(i + 97);
  if (j) s += j;
  n += 1;
  return s;
};

const simplifyHTMLStyle = (html) => {
  console.log(html.length / 1024 / 1024);
  const dom = document.createElement("div");
  dom.innerHTML = html;

  const styleMap = new Map();
  dom.querySelectorAll("*").forEach((v: HTMLElement) => {
    const styleObj = styleToObject(v.style.cssText) || {};
    let cls = [];
    Object.keys(styleObj).forEach((k) => {
      k = `${k}: ${styleObj[k]}`;
      if (!styleMap.has(k)) {
        styleMap.set(k, `${getId()}`);
      }
      cls.push(styleMap.get(k));
    });

    v.style.cssText = "";
    v.setAttribute("class", cls.join(" "));
  });

  let styleStr = "";
  styleMap.forEach((k, v) => {
    styleStr += `.${k}{ ${v}; }`;
  });

  const style = document.createElement("style");
  style.innerText = styleStr;

  dom.prepend(style);
  return dom.innerHTML;
};

export async function snapshotByDOM(dom) {
  const clone: any = await deepClone(dom, filter);

  const divs = clone.querySelectorAll("p div");
  divs.forEach((v) => replaceTag(v, "view"));
  var html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${document.title}</title>
            <link href="https://unpkg.com/reset-css@5.0.1/reset.css" rel="stylesheet">
        </head>
        <body>${simplifyHTMLStyle(
          dom !== document.body ? clone.outerHTML : clone.innerHTML
        )}</body></html>`;

  var { hostname, pathname } = window.location;
  pathname = pathname === "/" ? "/_" : pathname;
  //   const file = new File([s], "test", { type: "text/html" });
  const res = await uploadFile({
    Bucket: "images-1318918047" /* 填写自己的 bucket，必须字段 */,
    Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
    Key: `post/${hostname}${pathname}` /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
    // Body: file, // 上传文件对象
    file: {
      content: html,
      type: "text/html",
    },
  });

  return {
    url: `https://${res.Location}`,
    html,
  };
}

const defaultRule = [
  {
    pattern: "https://km.sankuai.com/**",
    container: "#ct-editor-wrapper .ProseMirror",
    scroll: true,
    scrollContainer: "#ct-editor-wrapper",
  },
  {
    pattern: "https://mp.weixin.qq.com/s/**",
    container: "#page-content",
  },
];

export async function snapshot() {
  await checkOptions();

  const { snapshot_config } = await chrome.storage.local.get("snapshot_config");

  const { href } = location;
  let dom = document.body;

  let rule = defaultRule;
  if (snapshot_config?.rule) {
    rule = JSON.parse(snapshot_config?.rule) || defaultRule;
  }
  const cfg = rule.find((v) => minimatch(href, v.pattern));

  if (cfg) {
    if (cfg.scroll) {
      let container: HTMLElement;
      let height: number;
      if (cfg.scrollContainer) {
        container = document.querySelector(cfg.scrollContainer);
        if (!container) throw new Error(`找不到元素 ${cfg.scrollContainer}`);
        height = container.scrollHeight;
      } else {
        container = window as any;
        height = document.body.offsetHeight;
      }
      await scrollTo(container, { x: 0, y: height }, 200);
      await scrollTo(container, { x: 0, y: 0 }, 10);
    }
    // (cfg.container && document.querySelector(cfg.container)) || document.body;
    if (cfg.container) {
      dom = document.querySelector(cfg.container);
      if (!dom) throw new Error(`找不到元素 ${cfg.container}`);
    }
  }
  return snapshotByDOM(dom);
}
