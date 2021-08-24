const request = require('request')

export function findImage(idk, cliente, min, subRege) {

    var matchedSubreddit = min.match(subRege)

    for(let i = 0; i < 3; i++) { // aplicar el regex
        request({ //obtener el codigo fuente
            url: "https://www.reddit.com/r/" + matchedSubreddit + "/random.json",
            json: true
            }, (err, response, body) => {
            var str = (JSON.stringify(body, undefined, 4));
            var rege = /((http[s]?|ftp):\/)?\/?(i.redd.it)\/([\w\-\.]+[^#?\s])(png|jpg|gif)(?=)/g
            var rege2 = /\/r\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\//g

            var randomImage = str.match(rege)
            var randomPost = str.match(rege2)
            
            if (randomImage === null) {
                var regeBan = /\{\s+\"reason\"\:\s\"banned\"\,\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\}/ig
                var regeExist = /\{\s+(\"kind\")\:\s(\"listing\")\,\s+(\"data\")\:\s\{\s+(\"after\")\:\s(null)\,\s+(\"dist\")\:\s(0)\,\s+(\"modhash\")\:\s(\"[\w\W]*\")\,\s+(\"geo\_filter\")\:\s(\"\")\,\s+(\"children\")\:\s(\[\])\,\s+(\"before\")\:\s(null)\s+\}\s+\}/ig
                if(i === 2 && randomPost !== null) {
                    cliente.say(idk, `no encontre ni una TONTA IMAGEN BabyRage intenta otra vez TONTO`)
                } else if(i === 2 && str.match(regeBan)) {
                    cliente.say(idk, `ese reddit esta BAN BabyRage`)
                } else if(i === 2 && str.match(regeExist)) {
                    cliente.say(idk, `ese reddit ni si quiera EXISTE BabyRage`)
                }
            } else {
                for (let i = 0; i < 1; i++) {
                    var image = randomImage[i];
                    var post = randomPost[i];
                }
                cliente.say(idk, `${image} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${post}`)
                return
            } 
        });
    } 
}