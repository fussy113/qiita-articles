# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
```

### バリデーション

```bash
pnpm run validate
```
記事のfrontmatterをバリデーションします（`scripts/validator.js`を実行）。タグにスペースが含まれていないかチェックします。

## 記事の構造

`public/` 内の記事は以下のfrontmatterが必要です：
- `title`: 記事タイトル
- `tags`: タグの配列（タグ内にスペースは不可）
- `private`: 公開/非公開のBoolean値
- その他のメタデータ: `id`, `updated_at`, `slide`, `ignorePublish` など

バリデータースクリプト（`scripts/validator.js`）は、タグにスペースが含まれていないことを強制します。`.remote` を含むファイルはバリデーションから除外されます。

## CI/CD

GitHub ActionsがPRで以下を実行します：
1. `pnpm run lint:md`（markdownlint）
2. `pnpm run validate`（タグのバリデーション）

## Markdown設定

Markdownlintのルールは `.markdownlint-cli2.jsonc` で設定されています。
