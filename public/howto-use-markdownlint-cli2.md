---
title: markdownlint-cli2を利用してローカル環境でMarkdownの文法チェックを行う
tags:
  - 'markdownlint'
  - 'markdownlint-cli2'
  - 'markdown'
private: true
updated_at: ''
id: null
organization_url_name: null
---
## はじめに

この記事では、ローカル環境でMarkdownを書く際に便利なmarkdownlintについて解説します。

## markdownlintとは

markdownlintは、Markdownの文法チェックを行うツールです。
Markdownの文法チェックを行うことで、Markdownの文法に沿った文章を書くことができます。

markdownlintは、現在VSCodeの拡張機能やGitHub Actions、ESlintの拡張やRubyのGemなど、幅広く利用できるように提供されています。

今回は、markdownlintのCLIツールである[markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)を利用して、ローカル環境でのMarkdownの文法チェックを行う方法を紹介します。

## markdownlint-cli2について

markdownlint-cli2は、[markdownlint-cli](markdownlint-cli)の後継にあたるCLIツールです。
markdownlint-cli2は、markdownlint-cliの機能を網羅しつつ、シンプルかつ早いことを特徴としています。

## markdownlit-cli2のインストール

markdownlint-cli2は、npmでインストールできます。

```bash
npm install -g markdownlint-cli2
```

## markdownlint-cli2を実行する

```bash
markdownlint-cli2 <Markdownファイルのパス>
```

複数ファイルや、`*`などを使った表現も可能です。

`--fix` オプションを付けることで、自動で修正することもできます。

```bash
markdownlint-cli2 --fix <Markdownファイルのパス>
```

試しに、以下のMarkdownファイルを作成して、markdownlint-cli2を実行してみました。

```markdown:article.md
## hello, world!
This is a test article.
https://example.com
```

```console
$ markdownlint-cli2 article.md
markdownlint-cli2 v0.8.1 (markdownlint v0.29.0)
Finding: article.md
Linting: 1 file(s)
Summary: 2 error(s)
article.md:1 MD022/blanks-around-headings/blanks-around-headers Headings should be surrounded by blank lines [Expected: 1; Actual: 0; Below] [Context: "## hello, world!"]
article.md:1 MD041/first-line-heading/first-line-h1 First line in a file should be a top-level heading [Context: "## hello, world!"]
```

なんかエラーが出ていますね。
見出しの前後には空行を入れる必要があるようです。
また、ファイルの先頭の見出しは`#`である必要がありそうです。

```markdown:article.md
# hello, world!

This is a test article.
https://example.com
```

```console
$ npx markdownlint-cli2 article.md
markdownlint-cli2 v0.8.1 (markdownlint v0.29.0)
Finding: article.md
Linting: 1 file(s)
Summary: 0 error(s)
```

エラーが出なくなりましたね:tada:

エラーメッセージに記載されている`MD022`など、markdownlintのルールに関しては、[こちら](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)から確認することができます。

## markdownlint-cli2の設定

エラーは表示されるようになりましたが、中にはこれでエラーは出したくないなどがあるかと思います。
configファイルを用意することで、markdownlint-cli2の設定をカスタマイズすることができます。

```jsonc:.markdownlint-cli2.jsonc
{
  "config": {
    "line-length": false, // MD013: 1文の最大文字数
    "no-duplicate-heading": false, // MD024: 見出し文字列の重複を許容
    "no-trailing-punctuation": false, // MD026: 見出しに.,;:が入ることを許容
    "no-inline-html": false, // MD033: HTML記述を許容
    "no-bare-urls": false, // MD034: URLそのままの表記を許容
    "fenced-code-language": false // MD040: コードブロックの言語指定を許容
  },
  "ignores": ["node_modules"] // node_modules配下はチェック対象外
}
```

configファイルを適用したい場合は、`--config`オプションを付けて実行します。

```bash
markdownlint-cli2 --config .markdownlint-cli2.jsonc <Markdownファイルのパス>
```

configはいろいろ設定できるため、[公式のドキュメント](https://github.com/DavidAnson/markdownlint-cli2#markdownlint-cli2jsonc)を参考にするのが良さそうです。

## まとめ

markdownlint-cli2を利用することで、ローカル環境でMarkdownの文法チェックを行うことができるようになります。
綺麗にMarkdownを書くことで、読みやすい、後から修正しやすいMarkdownを書くことができるようになると思うので、気になった方は是非試してみてください！
