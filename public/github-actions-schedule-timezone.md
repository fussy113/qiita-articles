---
title: GitHub Actionsのスケジュール実行（cron）でタイムゾーン（JST）を直接指定する
tags:
  - GitHubActions
  - cron
  - CI
  - GitHub
private: false
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---
## これは何

GitHub Actionsの`schedule`で指定するcronは、長らくUTC固定でした。
そのため日本時間（JST）で動かしたいワークフローを書くときは、頭の中で9時間を引いてUTCのcron式に変換する必要がありました。

最近、`schedule`に`timezone`キーが追加され、IANAタイムゾーン文字列を使ってタイムゾーンを指定できるようになりました。
これにより、JSTのまま素直にcronを書けます。

公式ドキュメントは下記です。

https://docs.github.com/ja/actions/reference/workflows-and-actions/workflow-syntax#onschedule

## 従来の書き方（UTC固定）

たとえば「毎朝7:00 JSTに実行したい」場合、UTCに変換すると前日の22:00です。
従来は次のように書いていました。

```yaml
on:
  schedule:
    - cron: '0 22 * * *' # 7:00 JST
```

cron式の数字とコメントの時刻が一致せず、後から読み返したときに混乱しやすいのが難点でした。
さらにサマータイムを採用している地域では、季節によってずれが発生します。

## 新しい書き方（timezone指定）

`cron`と同じ階層に`timezone`を追加し、IANAタイムゾーン文字列を渡します。
日本時間なら`Asia/Tokyo`です。

```yaml
on:
  schedule:
    - cron: '0 7 * * *' # 7:00 JST
      timezone: 'Asia/Tokyo'
```

cron式とコメントの時刻が一致するため、意図が読み取りやすくなります。

公式ドキュメントから引用すると、デフォルトはUTCのままで、`timezone`は任意で指定する形です。

> By default, scheduled workflows run in UTC. You can optionally specify a timezone using an IANA timezone string for timezone-aware scheduling.

## 実際の修正例

筆者のリポジトリでは、Qiita記事を同期するワークフローをスケジュール実行しています。
UTC変換していたcronを、`timezone`指定に書き換えました。

```diff
 on:
   schedule:
-    - cron: '0 22 * * *' # 7:00 JST
+    - cron: '0 7 * * *' # 7:00 JST
+      timezone: 'Asia/Tokyo'
```

複数のワークフローを連動させている場合も恩恵があります。
たとえば「同期の30分前にトークンの有効性をチェックする」ワークフローは、次のように書けます。

```yaml
on:
  schedule:
    - cron: '30 6 * * *' # 6:30 JST（同期の30分前）
      timezone: 'Asia/Tokyo'
```

UTC換算だと`30 21 * * *`となり、6:30との対応関係が直感的ではありませんでした。
JSTのまま書けると、ワークフロー同士の時刻の前後関係も把握しやすくなります。

## 注意点

サマータイム（DST）を採用しているタイムゾーンを指定した場合、春の切り替えでスキップされる時間帯に予定されたワークフローは、次の有効な時刻まで繰り上げて実行されます。

> For schedules that set `timezone` to a time zone that observes daylight saving time (DST), during DST spring-forward transitions, scheduled workflows in skipped hours advance to the next valid time.

日本はサマータイムを採用していないため、`Asia/Tokyo`を指定する分にはこの挙動を気にする必要はありません。

なお、スケジュール実行そのものの仕様として、GitHub側の負荷状況によって実行が遅延したり、まれにスキップされたりする点は従来どおりです。
分単位の正確さが必要な用途には向かない点は変わりません。

## まとめ

- `schedule`の`cron`と同じ階層に`timezone`を書けるようになった
- IANAタイムゾーン文字列（日本なら`Asia/Tokyo`）を指定する
- UTC換算が不要になり、cron式とコメントの時刻が一致して読みやすくなる
