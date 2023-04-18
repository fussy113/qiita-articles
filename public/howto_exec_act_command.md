---
title: newArticle001
tags:
  - act
  - GitHubActions
  - Docker
private: true
updated_at: 'Mon Apr 01 2024 00:00:00 GMT+0900 (日本標準時)'
id: 1311f4085f04540f532e
organization_url_name: null
---
## 初めに
この記事は、GitHub Actionsワークフローをローカル環境で実行する際に使用できる、[nektos/act](https://github.com/nektos/act)のインストール方法、簡単な使用方法をまとめた記事です。

## インストール方法

Linux、macOSを利用している場合、Homebrewを利用したインストールが推奨されています。

```shellscript
brew update
brew install act
```

actコマンドがインストールされているかを確認しましょう:+1:

```shellscript
$ act --version
act version 0.2.44
```
