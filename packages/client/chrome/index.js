// import { styleToObject } from "https://unpkg.com/style-to-object@latest/dist/style-to-object.min.js";
// const fs = require('fs');

// const html = fs.readFileSync('./index.html', 'utf-8');

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
  dom.querySelectorAll("*").forEach((v) => {
    const styleObj = window.StyleToObject(v.style.cssText) || {};
    // const styles = v.style.cssText.split(";");
    let cls = [];

    Object.keys(styleObj).forEach((k) => {
      k = `${k}: ${styleObj[k]}`;
      if (!styleMap.has(k)) {
        styleMap.set(k, `${getId()}`);
      }
      cls.push(styleMap.get(k));
    });
    // styles.forEach((k) => {
    // });

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

document.body.innerHTML = simplifyHTMLStyle(document.body.innerHTML);
