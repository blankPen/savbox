import packageJson from "../package.json";
import { ManifestType } from "@src/manifest-type";

const manifest: ManifestType = {
  manifest_version: 3,
  name: "一键快照",
  version: packageJson.version,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
//   content_security_policy: {
//     extension_pages:
//       "script-src 'self' https://*.meituan.com https://*.meituan.net;script-src-elem 'self' https://*.meituan.com https://*.meituan.net;",
//   },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    // default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png",
  },
  //   chrome_url_overrides: {
  //     newtab: "src/pages/newtab/index.html",
  //   },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle.chunk.css"],
      type: "module",
    },
  ],
//   sandbox: {
//     pages: [
//         "src/pages/popup/index.html"
//     ]
//   },
//   devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "src/pages/*/*.html",
        "icon-128.png",
        "icon-34.png",
      ],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage"],
};

export default manifest;
