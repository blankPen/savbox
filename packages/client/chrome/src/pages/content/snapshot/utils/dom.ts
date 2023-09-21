import styleToObject from "style-to-object";

export function replaceTag(oldElement, newTag) {
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

export const compressHTMLStyle = (() => {
  let n = 0;
  let getId = () => {
    const i = Math.floor(n % 24);
    const j = Math.floor(n / 24);
    let s = String.fromCharCode(i + 97);
    if (j) s += j;
    n += 1;
    return s;
  };
  return function (html: string) {
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
})();

// 使用bezier实现scrollTo
export function scrollTo(dom, offset, duration = 500) {
  const initialX = dom.scrollLeft;
  const initialY = dom.scrollTop;
  const differenceX = Math.min(offset.x, dom.scrollWidth) - initialX;
  const differenceY = Math.min(offset.y, dom.scrollHeight) - initialY;
  // const easing = bezier(0.165, 0.84, 0.44, 1);
  let start;
  var cb;
  let p = new Promise((resolve) => (cb = resolve));
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    // console.log(dom, percent, {
    //     x: initialX + differenceX * percent,
    //     y: initialY + differenceY * percent,
    // })
    dom.scrollTo({
      top: initialY + differenceY * percent,
      left: initialX + differenceX * percent,
    });

    if (time < duration) {
      window.requestAnimationFrame(step);
    } else {
      cb();
    }
  });
  return p;
}
