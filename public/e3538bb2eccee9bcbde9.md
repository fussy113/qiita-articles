---
title: Jestでcontextを使えるようにする
tags:
  - tips
  - Jest
  - Next.js
private: false
updated_at: '2021-06-03T13:55:57+09:00'
id: e3538bb2eccee9bcbde9
organization_url_name: qiita-inc
---
## これは何
記事投稿イベント「3000文字Tips」の参加記事です。

https://qiita.com/official-events/d523df99d6479293ffa7

## はじめに

RSpec などのテストを書かれる方は、`desctibe` と `context` を使い分けることがあるかと思います。
Jest には `describe` のみが存在していて、 `context` を利用することができませんでした。

Jest を使い始めて慣れて筆者は、久しぶりの RSpec で全部 `describe` で書いてレビュアーから指摘をいただきました()

あまり RSpec と Jest での書き方を分けたくない、同じように書けることを目指して、Jest でも `context` を使えるようにします。

既に context の設定の仕方は Jest のリポジトリでやり方が話されていますが、少し古いので、やり方を少し変える必要があります。

https://github.com/facebook/jest/issues/2468

## 開発環境
検証した環境です。
- Next.js: 10.2.2
- Jest: 26.6.3

## やり方
### context を定義する

issue 内に書いてあるように、describe のエイリアスを context に設定します。

```js:setupTestFramework.js
global.context = describe
```

### Jest 実行時に作成したファイルを読み込むようにする

```js:jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./setupTestFrameWork.js'],
}
```

元々はpackage.jsonや、jest.config.js に `setupTestFrameworkScriptFile` を定義していたようですが、今は `setupFilesAfterEnv` に置き換わったとのことです。
これで、testファイル内で `context` を利用できるようになりました。

### VSCode でエラーが出るのを解消する。

これで終わり！と思いきや、testファイルを開いてみると、何やら context に赤線が...

![VSCodeでエラーが出ている画面](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/693a08c0-54b6-4073-034f-a582c50df2e5.png)

Jest は context を解釈してくれていますが、VSCodeがそれを認識できず、エラーになっているようです。

手っ取り早く解消するのは、`d.ts`に定義してあげるのが良さそうです。

```
declare let context: jest.Describe
```

こちらで赤線が解消されます。
