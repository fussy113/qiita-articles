---
title: SolidJSでChrome拡張の作成に挑戦している話
tags:
  - chrome-extension
  - SolidJS
private: false
updated_at: '2023-06-15T00:51:33+09:00'
id: f8b94def55dedef7c06a
organization_url_name: qiita-inc
slide: false
---
## モチベーション

- Qiita で利用できそうなChrome拡張を作りたい
- Vue、React などはChrome拡張を作るためのtemplate がある
- SolidJS + vite でそれを構築できると、爆速で最高の開発体験を得られるのではと考えて実装を始めた。

## リポジトリ

https://github.com/fussy113/solid-webext

## 構成

- SolidJS
- TypeScript
- vite

```
.
├── README.md
├── package.json
├── public
│   └── manifest.json
├── src
│   ├── assets
│   │   ├── favicon.ico
│   │   └── img
│   │       └── logo.svg
│   └── pages
│       └── popup // 右上のアイコンをクリックすることで実行されるものをまとめる
│           ├── Popup.module.css
│           ├── Popup.tsx
│           ├── index.css
│           ├── index.html 
│           └── index.tsx
├── tsconfig.json
├── vite.config.ts
└── yarn.lock

```

```html:src/pages/popup/index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>Popup</title>
</head>

<body>
  <div id="root"></div>

  <script src="./index.tsx" type="module"></script>
</body>

</html>
```

```tsx:src/pages/popup/index.tsx
import { render } from "solid-js/web";
import "./index.css";
import { Popup } from "./Popup";

const root = document.querySelector("#root");
if (!root) {
  throw new Error("Can not find root");
}

render(Popup, root);
```

```tsx:src/pages/popup/Popup.tsx
import logo from "../../assets/img/logo.svg";
import styles from "./Popup.module.css";

export const Popup = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};
```

```json:public/manifest.json
{
  "manifest_version": 3,
  "name": "Solid Chrome Extension",
  "version": "0.0.1",
  "description": "SolidJS + Vite + ManifestV3",
  "action": {
    "default_popup": "src/pages/popup/index.html"
  },
  "web_accessible_resources": [
    {
      "resources": [
        "assets/css/*.css",
        "assets/img/*"
      ],
      "matches": [
        "*://*/*"
      ]
    }
  ]
}
```

Manifest V2 は2024/01 には完全廃止になるので、V3を使うのが良さそうです。

```ts:vite.config.ts
import path, { resolve } from "path";
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");
const isDev = process.env.__DEV__ === "true";

export default defineConfig({
  plugins: [solidPlugin()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        popup: resolve(pagesDir, "popup", "index.html"),
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev
          ? "assets/js/[name].js"
          : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name);
          const assetFolder = getLastElement(dir.split("/"));
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
      },
    },
  },
});

function getLastElement<T>(array: ArrayLike<T>): T {
  const length = array.length;
  const lastIndex = length - 1;
  return array[lastIndex];
}

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}

```

buildして試してみる

```
$ yarn build
yarn run v1.22.19
$ vite build
vite v3.1.4 building for production...
✓ 9 modules transformed.
dist/assets/svg/imgLogo.chunk.svg      1.56 KiB
dist/src/pages/popup/index.html        0.41 KiB
dist/assets/css/popupIndex.chunk.css   0.74 KiB / gzip: 0.48 KiB
dist/src/pages/popup/index.js          7.23 KiB / gzip: 3.10 KiB
Done in 5.89s.
```

生成されたdistディレクトリをChrome 拡張としてimportすることができた

![スクリーンショット 2022-12-18 21.46.37.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/ceefda5f-601e-9a65-9afc-293bdf07bd5d.png)

Pages 配下にどんどん拡張を作るための機能を追加していきたい。
