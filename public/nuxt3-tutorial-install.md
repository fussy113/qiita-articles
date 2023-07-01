---
title: Nuxt3入門 ~インストール編~
tags:
  - Vue.js
  - Vue3
  - Nuxt
  - Nuxt3
private: false
updated_at: '2023-07-02T02:01:22+09:00'
id: d5a64049f9113d5b3148
organization_url_name: qiita-inc
---
## はじめに

Nuxt3を触ろうと思い、その内容をまとめていきます。
今回は、Nuxt3のインストール、開発環境の起動までです。
[公式のインストールドキュメント](https://nuxt.com/docs/getting-started/installation)を見ながら進めていきます。

## 開発環境

ドキュメントによると、下記が必要なようです。

- Node.js: v16.10.0以上
  - 偶数バージョン(16, 18, 20など)の使用
- 【推奨】Editor: VSCode
  - 拡張機能
    - [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
      - takeover modeを有効にする
        - cmd + shift + p でコマンドパレットを開き、`Extensions: Show Built-in Extensions`を選択
        - `TypeScript と JavaScript の言語機能` を選択し、`Disable(workspace)`を選択してVSCodeをリロード

![VSCodeのTypeScriptの設定をオフにする](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/50ab8b31-f1c7-d76d-8685-77d1241e9004.png)

筆者は下記環境で試しています。

- Node.js: v18.16.0
  - パッケージマネージャは`pnpm`を使用しています。適宜読み替えてください:pray:
- Editor: VSCode

## Nuxt3のインストール

### プロジェクトの作成

`nuxi` コマンドを使ってプロジェクトを作成します。
(筆者が初めてNuxtを触った時は`create-nuxt-app`を使っていましたが、)

```shell
$ npx nuxi@latest init .
Nuxi 3.6.1
✨ Nuxt project is created with v3 template. Next steps:
 › Install dependencies with npm install or yarn install or pnpm install
 › Start development server with npm run dev or yarn dev or pnpm run dev
```

カレントディレクトリに、シンプルな構成のNuxt3プロジェクトが出来上がるようです。

```txt
.
├── README.md
├── app.vue
├── nuxt.config.ts
├── package.json
├── public
│   └── favicon.ico
├── server
│   └── tsconfig.json
└── tsconfig.json
```

依存パッケージをインストールしましょう

- `pnpm install`

### 開発環境の起動

`pnpm run dev`

localhost:3000 にアクセスすると、Nuxt3のデフォルトページが表示されます。
レンダリングまでに時間がどれだけかかったのかが、表示されます。

![Welcome to Nuxt!](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/e4fe1f96-f63e-366f-85b3-454583f31830.png)

### 【VSCode + Volarの場合】nuxt.config.tsの設定を変更する

ドキュメントで、`nuxt.config.ts`の設定を変更するように書かれているので対応します。

```typescript:nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    shim: false
  },
})
```

`defineNuxtConfig`の型情報が無いのでVSCode上で赤線出てますが、後々解消していきます。

### Hello, Worldを表示する

```diff:app.vue
<template>
  <div>
-   <NuxtWelcome />
+   <p>Hello World!</p>
  </div>
</template>
```

![Hello, World!](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/fa0c1e0a-572a-a62b-a692-fad2026d0ddf.png)

## 作ってみて

筆者は古に`create-nuxt-app` を使ってプロジェクト作成をした覚えがあるので`nuxi`コマンドに少し驚きました。
`nuxi`は対話などはなく、シンプルな構成を作る形のようですね。
自分でいろいろカスタマイズする必要がありそうなので、次はその辺をまとめてみようと思います。
