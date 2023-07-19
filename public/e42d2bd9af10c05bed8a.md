---
title: Cargoコマンドでできること一覧
tags:
  - Rust
  - cargo
private: false
updated_at: '2023-06-15T00:51:32+09:00'
id: e42d2bd9af10c05bed8a
organization_url_name: qiita-inc
slide: false
---
## cargo コマンドとは

- Rustのビルドシステム、パッケージマネージャー
  - コードのビルド
  - 依存パッケージのダウンロードなど管理
- パッケージ管理だけではなく、開発に必要なツールなどもcargo コマンドにまとまっている

この記事では、cargo コマンドで可能な基本的な内容をまとめました。

## コマンド詳細

### `cargo help`

まずは何がともあれ、helpを見てみます。

```
$ cargo help
Rust's package manager

USAGE:
    cargo [+toolchain] [OPTIONS] [SUBCOMMAND]

OPTIONS:
    -V, --version               Print version info and exit
        --list                  List installed commands
        --explain <CODE>        Run `rustc --explain CODE`
    -v, --verbose               Use verbose output (-vv very verbose/build.rs output)
    -q, --quiet                 Do not print cargo log messages
        --color <WHEN>          Coloring: auto, always, never
        --frozen                Require Cargo.lock and cache are up to date
        --locked                Require Cargo.lock is up to date
        --offline               Run without accessing the network
        --config <KEY=VALUE>    Override a configuration value
    -Z <FLAG>                   Unstable (nightly-only) flags to Cargo, see 'cargo -Z help' for
                                details
    -h, --help                  Print help information

Some common cargo commands are (see all commands with --list):
    build, b    Compile the current package
    check, c    Analyze the current package and report errors, but don't build object files
    clean       Remove the target directory
    doc, d      Build this package's and its dependencies' documentation
    new         Create a new cargo package
    init        Create a new cargo package in an existing directory
    add         Add dependencies to a manifest file
    run, r      Run a binary or example of the local package
    test, t     Run the tests
    bench       Run the benchmarks
    update      Update dependencies listed in Cargo.lock
    search      Search registry for crates
    publish     Package and upload this package to the registry
    install     Install a Rust binary. Default location is $HOME/.cargo/bin
    uninstall   Uninstall a Rust binary

See 'cargo help <command>' for more information on a specific command.
```

`(see all commands with --list)` と記載があるということは、まだまだできることがありそうです。

## cargo コマンドのオプション

`common cargo commands` として表示されたサブコマンドをそれぞれ見ています。

## サブコマンド

### `cargo new`

`cargo new $DIR_NAME`

Current Directoryでプロジェクトを作成しようとすると、エラーになる
`cargo new .`

### `cargo init`

`cargo new` でできなかった、Current Directoryでプロジェクトを作成することができる
上書きかを選べる

基本的にnew かinit、どちらかの使い分けになりそうです。

### `cargo build`

- 初期設定では、`target` ディレクトリにコンパイルした後の実行可能なファイルが生成される
- `Cargo.toml` に記載された外部パッケージがインストールされる
  - このときインストールされたパッケージは、`Cargo.lock` に記載される

```
$ cargo build
   Compiling rust-playground v0.1.0 (/workspaces/rust-playground)
    Finished dev [unoptimized + debuginfo] target(s) in 13.41s
```

### `cargo check`

- `cargo build` との違いは、実行可能ファイルが生成されるか
- こちらは生成されない、コンパイルが通るかの確認のみ
  - 爆速でコンパイルの確認ができる

```
$ cargo check
    Checking rust-playground v0.1.0 (/workspaces/rust-playground)
    Finished dev [unoptimized + debuginfo] target(s) in 0.41s
```

### `cargo run`

- `cargo build` ののち、実行可能なファイルが実行され、結果が出力される
- build はrust のコードに変更がない場合はbuild はされず、実行可能なファイルが実行されるだけなので、爆速

```
$ cargo run
   Compiling rust-playground v0.1.0 (/workspaces/rust-playground)
    Finished dev [unoptimized + debuginfo] target(s) in 10.96s
     Running `target/debug/rust-playground`
Hello, World!!
```

### `cargo test`

- build、テストが実行される

```
$ cargo test
   Compiling rust-playground v0.1.0 (/workspaces/rust-playground)
    Finished test [unoptimized + debuginfo] target(s) in 15.40s
     Running unittests src/main.rs (target/debug/deps/rust_playground-d70922e9a7636aca)

running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

### `cargo bench`

- ベンチマーク用にマークされた関数を実行する

:::note warn
`nightly` でのみ、実行が可能です、下記コマンドを使うことで切り替えることができます。
`rustup default nightly`
`rustup default stable`
:::

```
$ cargo bench
   Compiling autocfg v1.1.0
   Compiling libc v0.2.138
   Compiling num-traits v0.2.15
   Compiling cfg-if v1.0.0
   Compiling getrandom v0.2.8
   Compiling num-integer v0.1.45
   Compiling rand_core v0.6.4
   Compiling rawpointer v0.2.1
   Compiling ppv-lite86 v0.2.17
   Compiling rand_chacha v0.3.1
   Compiling matrixmultiply v0.3.2
   Compiling num-complex v0.4.2
   Compiling rand v0.8.5
   Compiling ndarray v0.15.6
   Compiling rust_playground v0.1.0 (/workspaces/rust-playground)
    Finished bench [optimized] target(s) in 52.90s
     Running unittests src/lib.rs (target/release/deps/rust_playground-72f10171cbdb2725)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running unittests src/main.rs (target/release/deps/rust_playground-5be3e9f166d274f7)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running benches/bench.rs (target/release/deps/bench-1eef477302a4ca70)

running 2 tests
test option_bench ... bench:   9,334,350 ns/iter (+/- 23,996,301)
test raw_bench    ... bench:   9,407,176 ns/iter (+/- 13,941,990)

test result: ok. 0 passed; 0 failed; 0 ignored; 2 measured; 0 filtered out; finished in 18.85s
```

### `cargo add`

- crate を追加し、インストールを行う
  - `Cargo.toml`、`Cargo.lock` が更新される
- 指定の仕方は大きく3つ
  - publishされている crate名@version で指定する
    - crate名のみだと、最新のバージョンがインストールされる
  - path で指定する
    - ローカルで作成したcrate を指定する際に利用
  - GitHub のリポジトリのURLで指定する
- publishされているcrate は、https://crates.io/ で探すことができる
- または、`cargo search` でも名前がわかっていれば探すことができる

```
$ cargo add rand@0.8.5
    Updating crates.io index
      Adding rand v0.8.5 to dependencies.
             Features:
             + alloc
             + getrandom
             + libc
             + rand_chacha
             + std
             + std_rng
             - log
             - min_const_gen
             - nightly
             - packed_simd
             - serde
             - serde1
             - simd_support
             - small_rng
```

### `cargo search`

- https://crates.io/ に公開されているcrateで検索にマッチするものを表示する
  - 順番はおそらく、https://crates.io/ と同じで関連順とおもわれる
  - デフォルトで10件、最大100件表示できる(オプション)

```
$ cargo search rand
rand = "0.8.5"              # Random number generators and other randomness functionality. 
tinyrand = "0.5.0"          # Lightweight RNG specification and several ultrafast implementations in Rust.
random_derive = "0.0.0"     # Procedurally defined macro for automatically deriving rand::Rand for structs and enums
faker_rand = "0.1.1"        # Fake data generators for lorem ipsum, names, emails, and more
rand_derive2 = "0.1.18"     # Generate customizable random types with the rand crate
fake-rand-test = "0.0.0"    # Random number generators and other randomness functionality. 
ndarray-rand = "0.14.0"     # Constructors for randomized arrays. `rand` integration for `ndarray`.
rand_derive = "0.5.0"       # `#[derive(Rand)]` macro (deprecated). 
rhai-rand = "0.1.4"         # Random number package for Rhai
rand_core = "0.6.4"         # Core random number generator traits and tools for implementation. 
... and 917 crates more (use --limit N to see more)
```

### `cargo doc`

- doc を作成する
- デフォルトは`target/doc` 配下に作成される
- プロジェクトのドキュメントはもちろん、Installしている crate のドキュメントもまとまっている

![cargo_doc.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/166596/a94aa800-7ad7-15b1-27cc-e7ec23271366.png)

プロジェクトで使用している他のcrate なども参照ができて、とても便利ですね。

### `cargo publish`

- 自身のプロジェクトをhttps://crates.io/ に公開する
- dry-run で試すこともできる

```
$ cargo publish --dry-run
    Updating crates.io index
warning: manifest has no description, license, license-file, documentation, homepage or repository.
See https://doc.rust-lang.org/cargo/reference/manifest.html#package-metadata for more info.
   Packaging rust-playground v0.1.0 (/workspaces/rust-playground)
   Verifying rust-playground v0.1.0 (/workspaces/rust-playground)
   Compiling rust-playground v0.1.0 (/workspaces/rust-playground/target/package/rust-playground-0.1.0)
    Finished dev [unoptimized + debuginfo] target(s) in 10.01s
   Uploading rust-playground v0.1.0 (/workspaces/rust-playground)
warning: aborting upload due to dry run
```

### `cargo clean`

- build で生成されたファイルが削除される

### `cargo install`

- バイナリパッケージをインストールする際に使用

### `cargo uninstall`

- `cargo install` されたパッケージをプロジェクトから削除する

ヘルプに書いてある内容をまとめたが、 https://doc.rust-lang.org/cargo/reference/index.html にはまだまだコマンドがいっぱいある様子
気になる人は是非見てみてください
