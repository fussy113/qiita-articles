---
title: TSKaigi 2024参加レポート
tags:
  - 'TypeScript'
  - 'TSKaigi'
  - 'カンファレンス・勉強会メモ'
  - 'イベントレポート'
private: false
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---
## これは何

https://tskaigi.org/

5/11(土)に開催されたTSKaigi 2024に現地参加してきました！
自分が聴講したセッションや、参加しての感想をまとめていきます。

## 自分が聴講したセッション

### Keynote: What's New in TypeScript

TypeScript Principal Product ManagerであるDaniel Rosenwasser氏によるKeynoteセッション。
こういった方のリアルなセッションを聴けるだけでも貴重ですよね。

内容としては、TypeScript 5.4の新機能、5.5の目玉機能についてのお話でした。

5.5 で導入される`Inferred Type Predicates` によって、filterなどで型が正しく推論されるようになるのが良いなと思いました！

```typescript
const result = ['test', 1, null, 19, undefined].filter ((value) => typeof value === 'number')
```

![v5_5以前.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/1bb95626-ad9b-168c-4ef9-a0105a25d70d.png)

![v5_5以降.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/08ad86bf-b4a8-d454-5ac9-8bb7de8aea3d.png)

### フロントエンドもバックエンドもインフラも… 全てをTypeScriptで統一したらこうなった！

発表者の方のTypeScriptの良さ、実際にプロダクトでFull TypeScriptを採用したことで得られたメリットについてのお話でした。

自分もJavaScriptを書く機会が多かったので、TypeScriptの型安全性や開発効率の向上について共感できる部分が多かったです。

また、登壇者さんの関わるプロダクトでは、HonoやPulumiを採用して、バックエンド、インフラ含めてTypeScriptを利用している、APIリクエストの型定義について[zodios](https://www.zodios.org/)を利用されているとのことで興味深かったです。
私自身、こういったFull TypeScriptの環境はベンチャー企業のようにスピード感があって領域問わずに実装を求められる環境においてマッチするのではないかと考えていて、実際に採用されている事例を聞けて良かったです。

### ランチセッション

スポンサー企業さんによるLTをご飯を頂きながら聞きました。
特に印象に残ったものをピックします。

#### エンジニアの技術的な意思決定を支えるADR - LayerXの活用事例

LayerXのエンジニアの方による、ADRについてのお話でした。
意思決定、意思決定までのプロセスがドキュメント化されている、誰でも閲覧できるようになっているとのことで、組織の透明性の高さを感じました。

スポンサーブースで実際のADRを見せていただいたのですが、現時点で150を超えるADRが作成されている、Notionによって一覧になっていてとても見やすいなと感じました。

#### チームで挑む TypeScript コードの漸進的改善

https://speakerdeck.com/medley/progressive-improvement-of-typescript-code

- `typescript-eslint`のルールをチームで週次で見直し、合意しながら適用しているというのが印象的でした。

#### Ubie のプロダクト開発における技術的レバレッジポイント3選

- プロダクト開発の複雑性を抑える、そのために言語はTypeScriptに統一することで技術的な複雑性を持ち込まない

プロダクト開発の複雑な仕様に向き合うために、言語を統一することで新規言語の学習コストを抑えるというのは個人的に目から鱗でした。

### TypeScript 関数型バックエンド開発のリアル

https://speakerdeck.com/naoya/typescript-guan-shu-xing-sutairudebatukuendokai-fa-noriaru

TypeScriptで実装する中で、関数型プログラミングの考え方を取り入れての知見の共有するというセッションでした。
暗黙的な状態変化などを減らすことができて把握しやすい、堅牢に作れるといった点でメリットを感じました。
まだまだ理解が浅い、僕自身試したことの無い手法だったので、実際に試してみたい気持ちが湧いています。

### 複雑なビジネスルールに挑む：正確性と効率性を両立するfp-tsのチーム活用術

前のセッションに引き続いて、関数型プログラミングのアプローチによってビジネス課題の解決に取り組むというセッション。
excelファイルを読み込む際に、一件ずつしか返ってこないエラー(とてもわかる)を、[fp-ts](https://gcanti.github.io/fp-ts/)を利用してエラーをまとめるようにしたという内容でした。

TypeScriptと[fp-ts](https://gcanti.github.io/fp-ts/)や[neverthrow](https://github.com/supermacro/neverthrow)などを組み合わせてバックエンド開発を行うのは、一度自分自身でも試してみたい。

### tRPCを実務に導入して分かった旨味と苦味

https://speakerdeck.com/misoton665/trpcwoshi-wu-nidao-ru-sitefen-katutazhi-wei-toku-wei

tRPCをプロダクトで利用しての事例共有のセッション。
自分自身、tRPCの利用がなかったのですが、GraphQLとの違い、tRPCのメリット、デメリットについて聞くことができました。
Data TransformerやAdapterパッケージなど、tRPCを利用するにあたってどんな周辺パッケージや機能を使うと良いかなど、具体的な事例が共有されていて勉強になりました。

### TypeScriptとGraphQLで実現する型安全なAPI実装

https://speakerdeck.com/hokaccha/tskaigi-2024

TypeScriptでGraphQL利用した実装をするにあたって、バックエンド、フロントエンドそれぞれでどのように実装すると良いかのプラクティスが共有されました。
GraphQL周りのキャッチアップも、まだまだ足りていないので、具体的な実装例を見ながらプラクティスを知ることができて良かったです。

## ブース

"こんなTypeScriptはイヤだ"であったり、Xにポストすることでガチャを引くなど、個性的なブースや、コーヒーを振る舞ってくれる素敵なブースもありました。
自分がこれまで参加していた技術カンファレンスでは見たことのない企業さんがブースをされていたりで個人的には新しい発見などがありました。

また余談ですが、アセンド株式会社さんのブースでHHKBをいただくという豪運を手にしましたw

https://twitter.com/yu_mattzn/status/1789180259117724084

学びも物理的にも得られるものが多かったイベントでした。

## まとめ

Full TypeScriptを採用しているプロダクトについての話が今回気になって参加したのですが、そのセッションや事例を聞くことが出来たので、とても良かったです。
また筆者自身はフロントエンドでのTypeScriptの利用がほとんどだったので、バックエンドでのTypeScriptの利用事例や、関数型プログラミングのアプローチについてのセッションは新鮮でした。
自身のキャッチアップの足りなさを痛感、刺激を得られたのでより一層学びを深めていきたいです。

TSKaigi、今回が初開催とのことですが、こういったコミュニティが生まれていくのは非常に良いなと感じるので、これからも応援したいです。
