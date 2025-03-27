---
title: RailsデフォルトのDevcontainer でBundlerキャッシュを使う
tags:
  - Rails
  - tips
  - devcontainer
private: false
updated_at: '2025-03-28T04:01:49+09:00'
id: 0c65978956ed1812bd78
organization_url_name: null
slide: false
ignorePublish: false
---

Rails newする時、`--devcontainer` オプションを指定することで、Devcontainer を使った開発環境を構築することができます。

この時構築されるDevcontainer の環境はbundle install されたgem のキャッシュが使われていません。
そのため、bundle install が走るたびにgem のダウンロードが発生するため、Devcontainer 立ち上げの度に時間がかかります。

`compose.yml` のvolume の設定を追加することで、bundle install されたgem のキャッシュをすることができますが、Devcontainer の場合は、Rails 公式から、features として提供されています。

```json:.devcontainer/devcontainer.json
{
  "name": "rails_sample",
  "dockerComposeFile": "compose.yaml",
  "service": "rails-app",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
  "features": {
    // ここに追加する
    "ghcr.io/rails/devcontainer/features/bundler-cache:1": {},
  },
  "forwardPorts": [
    3000,
    3306
  ],
  "postCreateCommand": "bin/setup --skip-server",
  "postStartCommand": "bundle check || bundle install"
}
```

実際にDevcontainer を立ち上げると、postCreateCommand で設定したbundler-cache のfeatures がなんか実行されていることがわかります。

```shell
Running the postCreateCommand from Feature 'ghcr.io/rails/devcontainer/features/bundler-cache:1'...

[45943 ms] Start: Run in container: /bin/sh -c sudo chown -R ${USER} /bundle
```

https://github.com/rails/devcontainer/tree/main/features/bundler-cache

`features/bundler-cache/devcontainer-feature.json` を見るに、volumes を設定、インストール先のディレクトリの権限変更をfeatures を呼ぶことで実現してくれているようです。

Dockerfile でディレクトリ作って権限設定したり、volume を設定する手間が省けるので、便利だなというtipsでした。

Rails 公式で提供されているfeaturesなので、のちにデフォルトで入りそうな気もしますね :eyes:

また、Rails 公式のfeatures は他にもあるので、興味があれば見てみると良いかもしれません。
