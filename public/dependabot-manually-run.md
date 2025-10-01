---
title: GitHub上でDependabotを手動実行する方法
tags:
  - GitHub
  - tips
  - dependabot
private: false
updated_at: '2025-10-01T22:50:38+09:00'
id: be0a2540a5e1da9adfea
organization_url_name: null
slide: false
ignorePublish: false
---

Dependabotは定期的に依存関係の更新をチェックしてPRを作成してくれますが、設定変更後やすぐに更新を確認したい場合など、手動で実行したいことがある。

## 手動実行の手順

1. GitHubリポジトリのページを開く
2. 「Insights」タブをクリック
3. 左サイドバーの「Dependency graph」をクリック
4. 「Dependabot」タブをクリック
5. 実行したいエコシステム（npm, pip, bundlerなど）の「Last checked」の横にある「Check for updates」ボタンをクリック

![手順1](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/c7aeecb8-9229-40c4-9997-75d776d44cd9.png)

![手順2](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/d4e93cf8-c3c8-4f87-8bb8-fea227db8085.png)

実行されたかどうかは、`Actions` からDependabot Updatesのワークフロー履歴で確認できる。
