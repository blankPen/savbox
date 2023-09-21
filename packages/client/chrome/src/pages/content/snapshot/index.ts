import { minimatch } from "minimatch";
import { scrollTo } from "./utils";
import { snapshot } from "./snapshot";

function sendEvent(type: string, data?: any) {
  return new Promise<any>((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type,
        data,
        from: "content",
      },
      (response) => {
        console.log("content.js收到background.js信息", response);
        if (response?.error) reject(response.error);
        else resolve(response?.data);
      }
    );
  });
}

export async function uploadFile(opt: any) {
  return sendEvent("uploadFile", opt);
}

export async function checkOptions() {
  return sendEvent("checkOptions");
}

const config = [
  {
    pattern: "https://km.sankuai.com/collabpage/**",
    container: "#ct-editor-wrapper .ProseMirror",
    scroll: true,
    scrollContainer: "#ct-editor-wrapper",
  },
  {
    pattern: "https://km.sankuai.com/page/**",
    container: ".ct-editor-wrapper",
    scroll: true,
    scrollContainer: "#viewPageScrollWrapper",
  },
];

export async function snapshotWithConfig() {
  await checkOptions();

  let dom = document.body;

  const cfg = config.find((v) => minimatch(location.href, v.pattern));
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
  // 生成快照
  const result = await snapshot(dom, {
    upload: async (opt) => {
      const res = await sendEvent("uploadFile", opt);
      return `https://${res.Location}`;
    },
  });

  // 保存结果
  await sendEvent("saveResult", result);
  return result;
}
