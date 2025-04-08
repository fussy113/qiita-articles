---
title: Devcontainer で Claude Code を使う時はfeatures でインストール出来る
tags:
  - tips
  - VSCode
  - devcontainer
  - Claude
  - ClaudeCode
private: false
updated_at: '2025-03-17T04:11:01+09:00'
id: eba52ac807c060dce379
organization_url_name: null
slide: false
ignorePublish: false
---

Claude Code はNode.jsで動かすことができ、以下のようなコマンドでインストールできます。

```bash
npm install -g @anthropic/claude-code
```

CLI で動くため、Devcontainer 上で使うことができ、その際のDockerfile には、上記のコマンドを記載するように公式ドキュメントやサンプルコードに記載されています。

https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#configuration-breakdown

一方で、Anthropics の公式より、[Devcontainer Features](https://github.com/devcontainers/features) が提供されています。

https://github.com/anthropics/devcontainer-features

これにより、Devcontainer の環境でのみ、Claude Code をインストールすることができます。

```json:.devcontainer/devcontainer.json
{
  // ...他の設定の記述
  "features": {
    // コンテナでNode.jsをインストールしていない場合は、併せてインストールする
    "ghcr.io/devcontainers/features/node:1": {},
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  }
}
```

Dockerfile の修正をせず、簡単にセットアップ出来る方法としてfeatures は便利なので、おすすめです。
