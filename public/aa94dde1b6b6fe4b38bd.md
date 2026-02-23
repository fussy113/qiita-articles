---
title: 【ghコマンド】Bot作のPull Requestsを省いて表示したい
tags:
  - GitHub
  - tips
private: false
updated_at: '2025-12-19T07:09:15+09:00'
id: aa94dde1b6b6fe4b38bd
organization_url_name: null
slide: false
ignorePublish: false
---
## モチベーション

新しく入ったプロジェクトなどで過去のPull Requests(PR)を月単位で一覧にして見ていきたいなと思った。
GitHubのPR一覧の画面で、フィルターを使って期間を絞ることは簡単に出来るが、dependabot やプロジェクトによってはリリースのためのPRなど、Botが作成したPRなども一緒に並ぶ。
一覧に並ぶとちょっとノイズになってしまうので、これを除外する方法について考えた。

## GitHub のPR一覧の画面から出来ないか

Author(PRの作者)でフィルターできるので、これが使えないかと考えた。
しかし、Authorでのフィルターは、複数を指定できないため、複数のBotがPRを作成しているようなリポジトリでは、期待する形にならなかった。無念。

## ghコマンドで出来ないか

GitHub CLI（`gh`コマンド）を使えば、より柔軟にPRを取得・フィルタリングできるのではと考えた。

### JSON出力とjqを組み合わせる

`gh pr list`には`--json`オプションがあり、指定したフィールドをJSON形式で出力できる。これと`jq`コマンドを組み合わせることで、柔軟なフィルタリングが可能になる。

```bash
gh pr list --state all --limit 100 --json number,title,author,mergedAt
```

出力例：

```json
[
  {
    "author": {
      "is_bot": true,
      "login": "app/dependabot"
    },
    "mergedAt": "2024-03-15T10:30:00Z",
    "number": 123,
    "title": "Bump axios from 1.6.0 to 1.6.7"
  },
  {
    "author": {
      "is_bot": false,
      "login": "john-doe"
    },
    "mergedAt": "2024-03-14T09:00:00Z",
    "number": 122,
    "title": "Add user authentication feature"
  }
]
```

### Botを除外するフィルタリング

`author`オブジェクトには`is_bot`フィールドが含まれているので、これを使えば簡単にBotを除外できる。

```bash
gh pr list --state all --limit 100 --json number,title,author,mergedAt \
  | jq '[.[] | select(.author.is_bot == false)]'
```

Bot名を個別に指定する必要がなく、新しいBotが追加されても対応不要なので便利。

### 期間を絞り込む

マージ日時で期間を絞り込める。

```bash
gh pr list --state merged --limit 300 --json number,title,author,mergedAt,url \
  | jq '[.[] | select(.author.is_bot == false) | select(.mergedAt >= "2024-03-01" and .mergedAt < "2024-04-01")]'
```

### 見やすく整形する

最終的に見やすい形式で出力するには、`jq`でフォーマットを指定する。

```bash
gh pr list --state merged --limit 300 --json number,title,author,mergedAt,url \
  | jq -r '[.[] | select(.author.is_bot == false) | select(.mergedAt >= "2024-03-01" and .mergedAt < "2024-04-01")] | sort_by(.mergedAt) | .[] | "#\(.number) \(.title) (@\(.author.login)) - \(.mergedAt[0:10])"'
```

出力例：

```txt
#118 Fix login bug (@alice) - 2024-03-02
#120 Add dark mode support (@bob) - 2024-03-08
#122 Add user authentication feature (@john-doe) - 2024-03-14
```

## まとめ

- GitHub WebのUI上では、複数のBotを一度に除外するフィルタリングは難しい
- `gh pr list`と`jq`を組み合わせることで、Botを除外したPR一覧を取得できる

## 参考

- [GitHub CLI マニュアル](https://cli.github.com/manual/)
- [jq マニュアル](https://stedolan.github.io/jq/manual/)
