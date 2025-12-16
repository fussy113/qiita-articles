# CLAUDE.md

## コミュニケーション言語

**必ず日本語でやりとりしてください。**

## リポジトリ概要

Qiita CLI を使用してQiita記事を管理するリポジトリです。記事は `public/` ディレクトリにfrontmatterメタデータ付きのMarkdownファイルとして保存されます。

## パッケージマネージャ

### 必ずpnpmを使用してください

## よく使うコマンド

### プレビュー

```bash
pnpm preview
```
Qiita CLIを使用してQiita記事のローカルプレビューサーバーを起動します。

### リント

```bash
pnpm run lint:md        # public/*.md ファイルに対してmarkdownlintを実行
pnpm run lint:md:fix    # Markdownの問題を自動修正
pnpm run lint:text      # textlintを実行
```

## CI/CD

GitHub ActionsがPRで以下を実行します：
1. `pnpm run lint:md`（markdownlint）
2. `pnpm run lint:text`（textlint）
3. `pnpm run validate`（タグのバリデーション）
