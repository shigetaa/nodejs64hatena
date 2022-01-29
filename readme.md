# はてなブックマークからのダウンロード
ソーシャルブックマークの「はてなブックマーク」から有益な情報を取得する方法を紹介します。
Web APIが公開されているので、活用することで効率的な情報収集できます。

 ## はてなブックマークとはなにか？
はてなブックマークは、ソーシャルブックマークサービスです。
人気のあるブログやWebサイトを知るのに便利です。
その機能ですが、タグやコメントをつけて保存、公開が可能なので、ブックマーク数からサイトの人気を知るだけでなく、はてなユーザーのコメントを見ることが出来ます。

[はてなブックマーク<br>https://b.hatena.ne.jp/](https://b.hatena.ne.jp/)

## はてなブックマークに関連するAPI
はてなブックマークでは、Web APIが公開されています。
自分のブックマークを投稿したり、ブックマーク数を取得したり、
全文検索一覧を取得するなどのAPIがあります。

[はてなブックマーク API<br>http://developer.hatena.ne.jp/ja/documents/bookmark/](http://developer.hatena.ne.jp/ja/documents/bookmark/)

## ブックマーク数を取得する方法
はてなブックマークのAPIの基本は、AtomAPIが採用されていますが、
もっと簡単に使えるAPIも存在します。
それが、特定のURLがいくつブックマークされているのかを調べるAPIです。

GET リクエストでのシンプルな件数取得 API です。
> [書式]はてなブックマーク件数取得API
> https://bookmark.hatenaapis.com/count/entry?url=**(URL)**

上記の **(URL)** の部分に、任意のURLを記述すれば、ブックマーク数をテキストで取得することができるものとなってます。

### request モジュールをインストール
任意のURLのブックマーク数を取得するプログラムでは`request`モジュールを利用するので、以下のコマンドでインストールします。
```bash
npm i request
```
### プログラム作成
はてなブックマークのブックマーク数を取得するプログラムを`bookmark-count.js`と言うファイル名で作成していきます。
```javascript
// 取得対象URLの指定
var targetURL = "http://www.hatena.ne.jp/";
var COUNT_API = "https://bookmark.hatenaapis.com/count/entry?url=";

// モジュールの取り込み
var request = require('request');

// APIの指定
var url = COUNT_API + escape(targetURL);
request(url, function (err, res, body) {
	console.log("ブックマーク数: " + body);
});
```

実行するには、以下のコマンドを実行します。
```bash
node bookmark-count.js
```
```bash
ブックマーク数: 5617
```
