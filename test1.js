import { testImage } from "./src/functionsTest";

var spaces = ',reddit    ubius    aaaa a a a a a a'
var minuscula = spaces.trim();
var subredditRegex = /(?<=\,reddit\s+)(\w+)/ig

if(minuscula.match(subredditRegex)) {
	var matchedSubreddit = minuscula.match(subredditRegex)
	var url = "https://www.reddit.com/r/" + matchedSubreddit + "/random.json"
	console.log('haciendo request con url:' + url)
	var urlStr = 'https://i.redd.it/0nwnj66crqe71.jpg PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com/r/samuraijack/comments/ovrcq4/whoa_mamma_credits_to_katsumayoshida/'
	var rege = /((http[s]?|ftp):\/)?\/?(i.redd.it)\/([\w\-\.]+[^#?\s])(png|jpg|gif)(?=)/g
    var rege2 = /\/r\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\//g
	testImage(urlStr, rege, rege2)
}