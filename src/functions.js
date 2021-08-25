const request = require('request')
const fetch = require('node-fetch')

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

export async function top(strParameter, regeParameter, idk, cliente) {

    var randomImages = strParameter.match(regeParameter)
    if(randomImages !== null) {
        var chosenImage = randomImages[Math.floor(Math.random() * randomImages.length)]
    }
    if(randomImages === null) {
        var chosenImage = null
    }
    const response = await fetch("https://www.reddit.com/search.json?q=site:redd.it+url:" + chosenImage, {
        "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "es-US,es-419;q=0.9,es;q=0.8",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "csv=1; edgebucket=XeOg5IKAdFEJDp6QXo; reddaid=VT5ZBGX62KXZPWAB; reddit_session=345978169980%2C2020-05-28T17%3A52%3A37%2C989687bc35f7cdddf559972d7ee6bc9eaabd19bf; loid=00000000004exugwho.2.1566343918991.Z0FBQUFBQmUxcTB3c2hEWG9lRW9UQ1lTMDVwQXlZaDRGLVlsY1dkM1ZNLWdBaFNfcmQ1UFJzWUF6S2k4NS0yVFVuS2VUb25IVW1FYXJLdWVkdUFZNE9GWUFwLUtkMUJZU0JCeTJ5Ui15Tnk2a1dScU1uSXR5YS0wTDBwR0JZX0ZkV2dCYURMdm8tQ18; pc=6b; __aaxsc=2; mnet_session_depth=1%7C1600630956095; __gads=ID=f1fbe9ea5018b49f:T=1603477640:S=ALNI_MajquZCiKcS_GTIblhBAK3vMpXNeA; d2_token=3.ecacc5038f222c4d62f4822687032d14d8b5e0e71dbc794dcbc1ce051233a065.eyJhY2Nlc3NUb2tlbiI6IjM0NTk3ODE2OTk4MC05eFJYSUN4LTNuUzNheDF6MWhKM01XcVQyZEkiLCJleHBpcmVzIjoiMjAyMC0xMS0xMFQwNDozNzozNS4wMDBaIiwibG9nZ2VkT3V0IjpmYWxzZSwic2NvcGVzIjpbIioiLCJlbWFpbCJdfQ==; eu_cookie_v2=2; aasd=2%7C1617422218211; session=215de851b8fcfc809ccdd73b3d6c4de499eed571gASVSQAAAAAAAABKdC3VYEdB193inWmnMn2UjAdfY3NyZnRflIwoZDZkOTQ5MDU5MTY0N2ZhNzRlODllY2VjYTY0YTI3MmEwNDc4Y2U0NpRzh5Qu; USER=eyJwcmVmcyI6eyJ0b3BDb250ZW50VGltZXNEaXNtaXNzZWQiOjAsInJwYW5EdURpc21pc3NhbFRpbWUiOm51bGwsImNvbGxhcHNlZFRyYXlTZWN0aW9ucyI6eyJmYXZvcml0ZXMiOmZhbHNlLCJtdWx0aXMiOmZhbHNlLCJtb2RlcmF0aW5nIjpmYWxzZSwic3Vic2NyaXB0aW9ucyI6ZmFsc2UsInByb2ZpbGVzIjpmYWxzZX0sIm5pZ2h0bW9kZSI6dHJ1ZSwibGF5b3V0IjoiY2FyZCIsImdsb2JhbFRoZW1lIjoiUkVERElUIiwic3Vic2NyaXB0aW9uc1Bpbm5lZCI6ZmFsc2UsInRvcENvbnRlbnREaXNtaXNzYWxUaW1lIjpudWxsfX0=; Marcos875433_recentclicks2=t3_p5ojgu%2Ct3_p728av%2Ct3_p7jrfs%2Ct3_b52py8%2Ct3_pap0fl; recent_srs=t5_3lgce%2Ct5_2qh0u%2Ct5_2y73q%2Ct5_2qh4a%2Ct5_2qizd%2Ct5_2sey6%2Ct5_24tlbv%2Ct5_2qhhk%2Ct5_2s0fe%2Ct5_2ucno; token_v2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk4NDc1MTEsInN1YiI6IjM0NTk3ODE2OTk4MC1MN2RuTVotYnozYzNOX3lQaUpmaHVINVFNN1kiLCJsb2dnZWRJbiI6dHJ1ZSwic2NvcGVzIjpbIioiLCJlbWFpbCIsInBpaSJdfQ.zkXVe5MEvH82uDKTRhTYFPIGBdanFtwnqOoGk_KZ5tA; session_tracker=NMgTRmq1y9kLhX8QGi.0.1629844291662.Z0FBQUFBQmhKWE5EZV9LNWJKS0s4ZkJCNFNXNUFScFdRN2VRRkJhYktUSWVLZnlQT1JkR09FNGJXWE91VlpHTnNscjNaODZSc1FBSEpCRXhia1N6M2xIcG8xWVRCUGJ2VEpCYW11LXAxN3NrT0RnbTlpR3RKanhOdWVFX19CVmhwaFJhNENfQUpDRXY"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });
    var strResponse = await response.text();
    

    var rege2 = /\/r\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\//g
    var randomPost = strResponse.match(rege2)

    if (randomImages === null) {
        var regeBan = /\{\s+\"reason\"\:\s\"banned\"\,\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\}/ig
        var regeExist = /(\{\s+(\"kind\")\:\s(\"listing\")\,\s+(\"data\")\:\s\{\s+(\"after\")\:\s(null)\,\s+(\"dist\")\:\s(0)\,\s+(\"modhash\")\:\s(\"[\w\W]*\")\,\s+(\"geo\_filter\")\:\s(\"\")\,\s+(\"children\")\:\s(\[\])\,\s+(\"before\")\:\s(null)\s+\}\s+\})|(\{\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\})/ig
        var regePrivate = /\{\s+\"reason\"\:\s\"private\"\,\s+\"message\"\:\s\"forbidden\"\,\s+\"error\"\:\s403\s+\}/ig
        if(strParameter.match(regeBan)) {
            cliente.say(idk, `ese reddit esta BAN BabyRage`)
        } else if(strParameter.match(regeExist)) {
            cliente.say(idk, `ese reddit ni si quiera EXISTE BabyRage`)
        } else if(strParameter.match(regePrivate)) {
            cliente.say(idk, `ese reddit es PRIVADISIMO BabyRage`)
        } else {
            cliente.say(idk, `no encontre ni una TONTA IMAGEN BabyRage intenta otra vez TONTO`)
        }
    } else {       
        cliente.say(idk, `https://i.${chosenImage} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${randomPost[0]}`)
        return
    }
        
}