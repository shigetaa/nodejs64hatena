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