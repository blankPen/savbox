import { minimatch } from "minimatch";
import { scrollTo } from "./utils";
import { snapshot } from "./snapshot";

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
    let dom = document.body;

    const cfg = config.find((v) => minimatch(location.href, v.pattern));
    if (cfg) {
        if (cfg.scroll) {
            let container: HTMLElement | null;
            let height: number;
            if (cfg.scrollContainer) {
                container = document.querySelector(cfg.scrollContainer);
                if (!container) throw new Error(`找不到元素 ${cfg.scrollContainer}`);
                height = container.scrollHeight;
            } else {
                container = window as any;
                height = document.body.offsetHeight;
            }
            await scrollTo(container!, { x: 0, y: height }, 200);
            await scrollTo(container!, { x: 0, y: 0 }, 10);
        }
        // (cfg.container && document.querySelector(cfg.container)) || document.body;
        if (cfg.container) {
            const v = document.querySelector<HTMLElement>(cfg.container);
            if (!v) throw new Error(`找不到元素 ${cfg.container}`);
            dom = v;
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
