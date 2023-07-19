---
title: Vueで始めるLIFFアプリケーション
tags:
  - Vue.js
  - LIFF
private: false
updated_at: '2023-07-19T21:49:41+09:00'
id: aba2b89a53cfd07d0ce0
organization_url_name: qiita-inc
slide: false
---
vue-cli で作成したプロジェクトに対して、 npm パッケージから liff をインストールして、使うところまでを紹介します。

7月に LIFF SDK が npm パッケージとして公開され、これまでの CDN 読み込みとはまた別の方法で LIFF を利用できるようになっています。

※ 筆者はmac osで開発してます。

## プロジェクトの作成

とりあえず vue-cli で プロジェクトを作ってしまいます

```bash
yarn global add @vue/cli
vue create liff-vue
# いくつか項目選択を経て、ディレクトリが作成される

cd liff-vue
```

下記コマンドで、サーバーが立ち上がるところまで確認します。

```bash
yarn serve
```

![スクリーンショット 2020-12-19 23.53.59.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/43e0df38-da06-7705-fdd1-0ccc8f7362eb.png)

## ngrok を使用する

LIFF の利用のために,https でアプリを公開している必要があります。
サーバーを用意する、S3などにあげるなどが勿論良いですが、今回は簡単にやるために ngrok を使用してローカルでたてた vue アプリを外部に公開する形をとります。

```bash
brew install ngrok
```

ngrok のコマンドは下記です。

```bash
ngrok http 8080

# Docker で開発している場合はこっちを使用
# ngrok http -host-header="0.0.0.0:8080" 8080
```

また、 package.json を編集しておきます。

```json:package.json
"vue": {
   "devServer": {
      "disableHostCheck": true
  }
}
```

## LINE Developers のページから LIFFアプリを登録する

![スクリーンショット 2020-12-20 0.14.49.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/ca985a53-3ec2-51dd-414a-c597c020bb4f.png)

作成すると、LIFF IDが発行されるので、こちらをメモっておきましょう。

![スクリーンショット 2020-12-20 0.16.57.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/785f5c8f-f70f-4cca-9b88-72dbb8440ff3.png)

## LIFF をインストール、導入する

LIFF をさっとインストールしちゃいましょう。

```bash
yarn add @line/liff
```

```vue:src/App.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  loggedIn: {{ loggedIn }}
  {{ profile.displayName }}
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// LIFFをimportする
import liff from '@line/liff'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      loggedIn: false,
      profile: {},
      displayName: "",
    }
  },
  mounted() {
    // 最初に必ず実行する
    liff
      .init({ liffId: 'myLiffId' }) // LIFF IDを貼る
      .then(() => {
        this.loggedIn = liff.isLoggedIn()
        this.getProfile()
      })
      .catch((err) => {
        // Error happens during initialization
        this.occoredError = 'error:' + err
      })
  },
  methods: {
    // ログインユーザーのプロフィールを取得する
    getProfile() {
      liff.getProfile()
      .then(profile => {
        this.profile = profile
      })
    }
  }
}
</script>
```

LIFF アプリを発行した時にでる URL にスマホのLINEからアクセスしてみましょう。

![IMG_9967.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/20b849b1-39df-9ac5-3bdb-f21a3bfdbdea.jpeg)

これでひとまずは簡単な LIFF アプリケーションの出来上がりです。

[リファレンス](https://developers.line.biz/ja/reference/liff/)も充実しているので、是非いろいろ触ってみてください！
