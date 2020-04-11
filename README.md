### 当アプリについて

こちらはポートフォリオ用に作成した<a href="https://github.com/yuuta-wata/Todo-App-Client" alt="Todo-App-Client">Todo-App-Client</a>の API サーバーになります。

## 実装機能

ユーザー機能

- 新規登録
- ログイン
- ログアウト
- アカウント削除
- ログインユーザー情報取得
- 全ユーザー情報取得
- テストユーザー専用ログイン

タスク機能

- タスク投稿
- タスク情報取得
- 全ユーザーのタスク情報取得
- タスク削除

認証・検証

- Cookie

## 使用技術

フレームワーク

- Nest.js

クエリ

- GraphQL
- SQL

データベース

- PostgrSQL
- Admin

Cookie

- JWT

開発環境

- Docker/docker-compose

Paas

- Heroku

## ローカルでの起動方法

１、お好きなディレクトリにクローンしてください。

```bash
% git clone https://github.com/yuuta-wata/Todo-App-Server.git
```

２、ライプラリのインストールを行います。  
(注)yarn をインストールしてない方は別途インストールをお願いします。

```bash
% cd todo-app-server
% yarn
```

３、todo-app-server ディレクトリ直下に.env ファイルを作成し,下記をコピペしてください。  
(注).env ファイルは通常公開しません、今回はポートフォリオ作成なので公開しています。

```:/.env

TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=todo-app
TYPEORM_PORT=5432

ACCESS_TOKEN_SECRET=feojfanlkefj
CLIENT_DEVELOPMENT_URL=http://localhost:3000
```

４、Docker を起動します。(自動でテストユーザーが作成されます。)  
PostgreSQL と Admin が同時に立ち上がりますが、Admin を使用したく無い方は予め docker-compose.yml の adminer をコメントアウトしてください。  
(注)Docker をインストールしてない方は別途インストールしてください。

```bash
% docker-compose up
又は
% docker-compose up -d
```

５、expres サーバーを起動します。

```bash
% yarn start
又は
% yarn start:dev
```

６、ターミナルに表示される URL にアクセス又は下記からアクセスしてください。  
http://localhost:4000/graphql  
GraphQL クエリは画面右端にある DOCS、SCHEMA から確認出来ます。
