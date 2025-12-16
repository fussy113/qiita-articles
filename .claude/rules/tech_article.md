---
paths: public/**/*.md
---

# Tech Article Guideline

## 記事の構造

`public/` 内の記事は以下のfrontmatterが必要です：
- `title`: 記事タイトル
- `tags`: タグの配列（タグ内にスペースは不可）
- `private`: 公開/非公開のBoolean値
- その他のメタデータ: `id`, `updated_at`, `slide`, `ignorePublish` など

導入されている`markdownlint`、`textlint` のルールに基づいて記事は作成されます。
- Markdownlintのルールは `.markdownlint-cli2.jsonc` で設定されています。
- textlintのルールは `.textlintrc.json` で設定されています。

## バリデーション

```bash
pnpm run validate
```
記事のfrontmatterをバリデーションします（`scripts/validator.js`を実行）。タグにスペースが含まれていないかチェックします。

## 記事作成完了後のチェック

追加、変更を実施したmarkdownファイルに対して以下を実行し、passすることを確認してください。
failedした場合はその原因を確認して、修正します。

1. `pnpm run lint:md`（markdownlint）
2. `pnpm run lint:text`（textlint）
3. `pnpm run validate`（タグのバリデーション）
