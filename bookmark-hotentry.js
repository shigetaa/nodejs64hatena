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
