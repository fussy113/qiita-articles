---
title: Qiita CLI + GitHub Actionsで記事を自動更新するためのワークフローを作成する
tags:
  - GitHubActions
  - qiita-cli
private: false
updated_at: '2023-09-29T00:27:05+09:00'
id: b0ed6a26de5ed4a9c0a2
organization_url_name: null
slide: false
ignorePublish: false
---
## はじめに

[Qiita CLIのv0.5.0](https://github.com/increments/qiita-cli/releases/tag/v0.5.0)がリリースされました:tada:
アップデートの一つで`pull` コマンドに `--force` オプションが追加されました。
こちらを使って、GitHub Actionsのワークフロー上でQiitaの記事を自動更新するためのワークフローを作成してみました。

:::note warn
Qiita CLIはベータ版のため、今後のアップデートで仕様が変更される可能性があります。
:::

## ワークフローを作成する

- 特定時刻、または手動でワークフローを実行できる
- リポジトリのmasterブランチをpullして、Qiitaの記事を更新する
- 管理している記事ファイルに差分がある場合、Pull Requestを作成する

作成するワークフローは次のようになります。

```yaml:.github/workflows/sync-remote-and-create-pr.yml
name: Sync remote and create PR

on:
  schedule:
    - cron: '0 22 * * *' # 7:00 JST
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  sync_remote_and_create_pr:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v3
        with:
          ref: master
      - uses: actions/setup-node@v3
        with:
          node-version: '18.16.0'
      - run: npm install
      - run: npm exec qiita pull -- --force
        env:
          QIITA_TOKEN: ${{ secrets.QIITA_TOKEN }}
      - uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'Sync article files'
          delete-branch: true
          title: 'Sync article files'
          reviewers: fussy113
```

GitHub Actionsのワークフロー上で`qiita pull --force`を実行して、差分があった場合にはPull Requestを作成するようにしています。
Pull Requestの作成に関しては、下記記事を参考にしています。

https://qiita.com/mziyut/items/57486edcf8cbfa764dc1

これで記事を更新した後にワークフローが実行され、Pull Requestが作成されます。

![ワークフロー実行の様子](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/a07976df-92c7-c565-3ef1-db397f9ec244.png)

![作成されたPR](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/bea98f72-7ec2-07fe-32e3-d07ed4611196.png)

## 終わりに

Qiita CLIの`pull`コマンドに`--force`オプションが追加されたことで、GitHub Actionsのワークフロー上でQiitaの記事を自動更新するためのワークフローを作成しました。

Web上でQiita記事を更新した後、リポジトリの方でsyncしてあげる必要があるのですが、そちらを自動化することが出来るようになったので、より便利になった気がします:+1:
