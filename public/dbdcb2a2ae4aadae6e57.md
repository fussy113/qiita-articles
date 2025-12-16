---
title: 別プロセスが動いててClaude Codeのupdateが出来ない!?ってなった時の対処
tags:
  - tips
  - ClaudeCode
private: false
updated_at: '2025-12-16T23:06:26+09:00'
id: dbdcb2a2ae4aadae6e57
organization_url_name: null
slide: false
ignorePublish: false
---
## 何があった?

Auto Updateを有効にしているはずだが、claude code実行しても最新にupdateされないことがありました。

手動でupdateを試みる

```shell
$ claude update
Current version: 2.0.67
Checking for updates...
Another Claude process is currently running. Please try again in a moment.
```

:thinking:
doctorを表示しても特に問題はなさそうだった

```shell
$ claude doctor

 Diagnostics
 └ Currently running: native (2.0.67)
 └ Path: ${HOME_DIR}/.local/bin/claude
 └ Invoked: ${HOME_DIR}/.local/share/claude/versions/2.0.67
 └ Config install method: native
 └ Auto-updates: enabled
 └ Search: OK (bundled)
 
 Press Enter to continue…
```

## 解決法

https://github.com/anthropics/claude-code/issues/13599

Issueとしてすでに上がっていて、暫定での解決法が記載されていた。

```
The native installer locks are at
 rm -rf ~/.local/state/claude/locks/
if you want to get groovy
```

lockファイルが悪さをしていそうなので、その削除をして再度実行

```shell
$ rm -rf  ~/.local/state/claude/locks
$ claude update
Current version: 2.0.67
Checking for updates...
Successfully updated from 2.0.67 to version 2.0.70
```

:+1:
