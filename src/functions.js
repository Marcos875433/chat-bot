const request = require('request')

export function findImage(strParameter, regeParameter, regeParameter2, idk, cliente) {

    var randomImage = strParameter.match(regeParameter)
    var randomPost = strParameter.match(regeParameter2)
    
    if (randomImage === null) {
        var regeBan = /\{\s+\"reason\"\:\s\"banned\"\,\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\}/ig
        var regeExist = /(\{\s+(\"kind\")\:\s(\"listing\")\,\s+(\"data\")\:\s\{\s+(\"after\")\:\s(null)\,\s+(\"dist\")\:\s(0)\,\s+(\"modhash\")\:\s(\"[\w\W]*\")\,\s+(\"geo\_filter\")\:\s(\"\")\,\s+(\"children\")\:\s(\[\])\,\s+(\"before\")\:\s(null)\s+\}\s+\})|(\{\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\})/ig
        var regePrivate = /\{\s+\"reason\"\:\s\"private\"\,\s+\"message\"\:\s\"forbidden\"\,\s+\"error\"\:\s403\s+\}/ig
        if(randomPost !== null) {
            cliente.say(idk, `no encontre ni una TONTA IMAGEN BabyRage intenta otra vez TONTO`)
        } else if(strParameter.match(regeBan)) {
            cliente.say(idk, `ese reddit esta BAN BabyRage`)
        } else if(strParameter.match(regeExist)) {
            cliente.say(idk, `ese reddit ni si quiera EXISTE BabyRage`)
        } else if(strParameter.match(regePrivate)) {
            cliente.say(idk, `ese reddit es PRIVADISIMO BabyRage`)
        }
    } else {
        for (let i = 0; i < 1; i++) {
            var image = randomImage[i];
            var post = randomPost[i];
        }
        cliente.say(idk, `${image} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${post}`)
        return
    }

}