---
title: Nuxt3入門 ~周辺環境を整える~
tags:
  - Vue.js
  - Nuxt
  - Vue3
  - Nuxt3
private: false
updated_at: '2023-07-07T17:15:39+09:00'
id: 0ddd2c5e5d81a6a99023
organization_url_name: qiita-inc
slide: false
ignorePublish: false
---

## はじめに

Nuxt3を触ろうと思い、その内容をまとめていきます。
今回は下記ツールのインストールの手順についてまとめます。

- TypeScript
- ESLint
- TailwindCSS

前回のNuxt3のインストールの方法についてまとめた記事はこちらです。

https://qiita.com/fussy113/items/d5a64049f9113d5b3148

## ツールのインストール

### TypeScript

Nuxt3ではTypeScriptがデフォルトでサポートされています。
CLIで型チェックを行うことができます。

`npx nuxi typecheck`

しかし、デフォルトの設定では、`nuxt dev`などの開発環境を立ち上げている時には型チェックされません(buildの速度などを優先している)

開発中に型チェックを行いたい場合は、設定を変更することで実現できます。

- 必要なパッケージをインストールする

```shell
pnpm install typescript vue-tsc --save-dev
```

- `nuxt.config.ts`に開発時の型チェックを有効にする設定を記述する

```typescript:nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  }
})
```

これにより、開発環境を立ち上げ、buildされた時も型チェックがされるようになります。
(当然ながらbuildのスピードが落ちるので、offにして適宜CLIで実行するか、どっちかは好みで決めるのが良いと思います)

### ESLint

ESLintの設定については、パッケージをインストールすることで可能です。

```shell
pnpm i eslint @nuxtjs/eslint-config-typescript --save-dev
```

```cjs:.eslintrc.cjs
module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript']
}
```

VSCodeを利用している場合は、ESLintの拡張機能を使って、保存時に自動でフォーマットされるように設定しておくとよさそうです。

```json:.vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

なお、Nuxt3では、Prettier との並行の利用は現時点では推奨していないようです。

https://nuxt.com/docs/community/contribution#no-prettier

ESLintの`--fix`オプションを使うようにして、プロジェクトではPrettierを無効にするように記載されています。
(Prettierを有効にするかどうかについても、議論中のようです。あまり動いていない気もしますが...)

### おわりに

段々周辺環境が整ってきました。
TailwindCSS、Storybookの導入部分を次は試して、次記事にまとめられたらと思います。
