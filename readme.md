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
> [書式]はてなブックマーク件数取得API<br>
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

### 複数のURLのブックマーク数を取得する方法
はてなブックマークのブックマーク数を一気に複数URLをしていして取得するプログラムを`bookmark-count2.js`と言うファイル名で作成していきます。
```javascript
// 取得対象URLの指定
var url_list = [
	"http://www.hatena.ne.jp/",
	"https://twitter.com/",
	"http://www.amazon.co.jp/"
];
var COUNTS_API = "https://bookmark.hatenaapis.com/count/entries";

// モジュールの取り込み
var request = require('request');

// リクエスト用URLの作成
var params = [];
for (var i in url_list) {
	params.push("url=" + escape(url_list[i]));
}
var url = COUNTS_API + "?" + params.join("&");

// APIから結果の取得
request(url, function (err, res, body) {
	var obj = JSON.parse(body);
	for (var key in obj) {
		console.log(key + "のブックマーク数: " + obj[key]);
	}
});
```

実行するには、以下のコマンドを実行します。
```bash
node bookmark-count2.js
```
```bash
http://www.amazon.co.jp/のブックマーク数: 7382
http://www.hatena.ne.jp/のブックマーク数: 5617
https://twitter.com/のブックマーク数: 1063
```

## 人気エントリーを取得する
はてなブックマークで、人気のページの情報を取得することで、流行をいち早くキャッチすることが出来ます。
そのために、人気のページ一覧のRSSを取得するAPIが用意されています。
注目のエントリーを得るには次のおRSSを参照します。

[注目エントリーRSS<br>https://b.hatena.ne.jp/hotentry?mode=rss](https://b.hatena.ne.jp/hotentry?mode=rss)

[最近登録あれたエントリー<br>https://b.hatena.ne.jp/entrylist?mode=rss](https://b.hatena.ne.jp/entrylist?mode=rss)

[ITカテゴリーの注目のエントリー<br>https://b.hatena.ne.jp/hotentry/it.rss](https://b.hatena.ne.jp/hotentry/it.rss)

### cheerio-httpcli モジュールをインストール
プログラムで「cheerio-httpcli」モジュールを利用しているのでインストールします。
```bash
npm i cheerio-httpcli
```

### プログラムを作成
それでは、上記のRSSを利用して、人気のページタイトル一覧を表示プログラムを`bookmark-hotentry.js`ファイル名として作成していきます。
```javascript
// 対象RSS
var RSS_URL = "https://b.hatena.ne.jp/hotentry?mode=rss";

// モジュールの読込
var client = require('cheerio-httpcli');

// ダウンロード
client.fetch(RSS_URL, {}, function (err, $, res) {
	if (err) { console.log("error"); return; }
	// エントリーを抽出して表示
	$("item").each(function (idx, item) {
		// タイトルと説明とブックマーク数を取得
		var title = $(this).children('title').text();
		var desc = $(this).children('description').text();
		var count = $(this).children("hatena\\:bookmarkcount").text();
		console.log("(" + count + "B!) " + title);
		console.log(desc);
		console.log("---------");
	});
});

```

実行するには、以下のコマンドを実行します。
```bash
node bookmark-hotentry.js
```
すると、注目のエントリー一覧が表示されます。

