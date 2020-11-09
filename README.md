# アプリについて

こちらはポートフォリオ用に作成したタスク管理アプリ<a href="https://github.com/yuuta-wata/Todo-App-Client" alt="Todo-App-Client">Todo-App-Client</a>の API サーバーになります。

## 実装機能

**ユーザー機能**

- 新規登録
- ログイン
- ログアウト
- アカウント削除
- ログインユーザー情報取得
- 全ユーザー情報取得
- テストユーザー専用ログイン

**タスク機能**

- タスク投稿
- タスク情報取得
- 全ユーザーのタスク情報取得
- タスク削除

**認証・検証機能**

- JWT

## 使用技術

**フレームワーク**

- Nest.js

**クエリ**

- GraphQL
- SQL

**データベース**

- PostgrSQL
- Admin

**認証 ・検証**

- JWT

**開発環境**

- Docker/docker-compose

**Paas**

- Heroku

## ローカルでの起動方法

**１**、お好きなディレクトリにクローンしてください。

```bash
% git clone https://github.com/yuuta-wata/Todo-App-Server.git
% cd Todo-App-Server
```

**2**、Todo-App-Server ディレクトリ直下に.env ファイルを作成し,下記をコピペしてください。  
(注).env ファイルは通常公開しません、今回はポートフォリオ作成なので公開しています。

```:/.env

TYPEORM_CONNECTION=postgres
TYPEORM_HOST=db
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=todo-app
TYPEORM_PORT=5432

ACCESS_TOKEN_SECRET=feojfanlkefj
CLIENT_DEVELOPMENT_URL=http://localhost:3000
```

**3**、Docker を起動します。(自動でテストユーザーが作成されます。)  
PostgreSQL と Admin が同時に立ち上がりますが、Admin とテスト用 DB を使用したく無い方は予め docker-compose.yml の adminer、test-db をコメントアウトしてください。  
Admin のポートは 8080 番になります。  
(注)Docker をインストールしてない方は別途インストールしてください。

```bash
% docker-compose up
```

PC のスペックによっては Docker が重くて開発サーバーが安定しない場合があります。  
その場合は docker-compose.yml の**todo_server**をコメントアウトし、`yarn start:dev`でサーバーを立ち上げてください。

**4**、ターミナルに表示される URL にアクセス又は下記からアクセスしてください。  
http://localhost:4000/graphql  
GraphQL クエリは画面右端にある DOCS、SCHEMA から確認出来ます。
