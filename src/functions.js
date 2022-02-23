require('dotenv').config();
const request = require('request');
const fetch = require('node-fetch');
const fs = require('fs');
const admin = require('firebase-admin');
const PasteClient = require("pastebin-api").default;
const searchGameVods = require("./search-vods/utils/searchGameVods");
const pLimit = require('p-limit');
const crypto = require('crypto');
const { encode } = require('bs58');
const { PrivatebinClient } = require('@pixelfactory/privatebin');
const privatebin = new PrivatebinClient();

const TOKEN = process.env.BearerToken;
const Client_ID = process.env.Client_ID;
const paste = new PasteClient(process.env.pastebin_dev_key);

export function findImage(strParameter, regeParameter, regeParameter2, idk, cliente) {

    var randomImage = strParameter.match(regeParameter);
    var randomPost = strParameter.match(regeParameter2);
    
    if (randomImage === null) {
        var regeBan = /\{\s+\"reason\"\:\s\"banned\"\,\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\}/ig;
        var regeExist = /(\{\s+(\"kind\")\:\s(\"listing\")\,\s+(\"data\")\:\s\{\s+(\"after\")\:\s(null)\,\s+(\"dist\")\:\s(0)\,\s+(\"modhash\")\:\s(\"[\w\W]*\")\,\s+(\"geo\_filter\")\:\s(\"\")\,\s+(\"children\")\:\s(\[\])\,\s+(\"before\")\:\s(null)\s+\}\s+\})|(\{\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\})/ig;
        var regePrivate = /\{\s+\"reason\"\:\s\"private\"\,\s+\"message\"\:\s\"forbidden\"\,\s+\"error\"\:\s403\s+\}/ig;
        if(randomPost !== null) {
            cliente.say(idk, `no encontre ni una TONTA IMAGEN BabyRage intenta otra vez TONTO`);
        } else if(strParameter.match(regeBan)) {
            cliente.say(idk, `ese reddit esta BAN BabyRage`);
        } else if(strParameter.match(regeExist)) {
            cliente.say(idk, `ese reddit ni si quiera EXISTE BabyRage`);
        } else if(strParameter.match(regePrivate)) {
            cliente.say(idk, `ese reddit es PRIVADISIMO BabyRage`);
        }
    } else {
        for (let i = 0; i < 1; i++) {
            var image = randomImage[i];
            var post = randomPost[i];
        }
        cliente.say(idk, `${image} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${post}`);
        return;
    }

}

export async function top(strParameter, regeParameter, idk, cliente) {

    var randomImages = strParameter.match(regeParameter);
    if(randomImages !== null) {
        var chosenImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    }
    if(randomImages === null) {
        var chosenImage = null;
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
    

    var rege2 = /\/r\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\//g;
    var randomPost = strResponse.match(rege2);

    if (randomImages === null) {
        var regeBan = /\{\s+\"reason\"\:\s\"banned\"\,\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\}/ig;
        var regeExist = /(\{\s+(\"kind\")\:\s(\"listing\")\,\s+(\"data\")\:\s\{\s+(\"after\")\:\s(null)\,\s+(\"dist\")\:\s(0)\,\s+(\"modhash\")\:\s(\"[\w\W]*\")\,\s+(\"geo\_filter\")\:\s(\"\")\,\s+(\"children\")\:\s(\[\])\,\s+(\"before\")\:\s(null)\s+\}\s+\})|(\{\s+\"message\"\:\s\"not\sfound\"\,\s+\"error\"\:\s404\s+\})/ig;
        var regePrivate = /\{\s+\"reason\"\:\s\"private\"\,\s+\"message\"\:\s\"forbidden\"\,\s+\"error\"\:\s403\s+\}/ig;
        if(strParameter.match(regeBan)) {
            cliente.say(idk, `ese reddit esta BAN BabyRage`);
        } else if(strParameter.match(regeExist)) {
            cliente.say(idk, `ese reddit ni si quiera EXISTE BabyRage`);
        } else if(strParameter.match(regePrivate)) {
            cliente.say(idk, `ese reddit es PRIVADISIMO BabyRage`);
        } else {
            cliente.say(idk, `no encontre ni una TONTA IMAGEN BabyRage intenta otra vez TONTO`);
        }
    } else {       
        cliente.say(idk, `https://i.${chosenImage} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${randomPost[0]}`);
        return;
    }
        
}

export function fireConfig() {

    const GOOGLE_APPLICATION_CREDENTIALS = {
      "type": process.env.type,
      "project_id": process.env.project_id,
      "private_key_id": process.env.private_key_id,
      "private_key": JSON.parse(process.env.private_key),
      "client_email": process.env.client_email,
      "client_id": process.env.client_id,
      "auth_uri": process.env.auth_uri,
      "token_uri": process.env.token_uri,
      "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
      "client_x509_cert_url": process.env.client_x509_cert_url
    }

    admin.initializeApp({
        credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
        databaseURL: process.env.DATA_BASE_URL
    });
}

export async function checkList(db) {
    const channelRef = db.ref('channelsList');
    return new Promise((resolve, reject) => {
        channelRef.once('value', (snap) => {
            var channels = snap.val();
            channels = Object.values(channels);
            resolve(channels);
        });
    });
}

export async function checkChannel(db, username, cliente, idk, channelNames) {
    var channels = await checkList(db);
    if(!channels.includes(username)) {
        const db = fireConfig();
        const channelRef = db.ref('channelsList');
        channelRef.push('#' + username);
        channelNames.push('#' + username);
        cliente.say(idk, `voy FireSpeed`);
        cliente.join(username);
    } else {
        cliente.say(idk, `eres un MAMA HUEVAZO BabyRage, ya esta el bot unido a tu chat`);
    }
}

export function checkConnection() {
    try {
        const db = declareDB();
    
        const connectedRef = db.ref(".info/connected");
        connectedRef.once('value', (snap) => {
            if(snap.val() === true) {
                console.log('conectadisimo chavalin');
            }
        });
    } catch(error) {
        console.error(error.message);
        let daMessage = 'The default Firebase app does not exist. Make ' +
            'sure you call initializeApp() before using any of the Firebase services.';
        if(error.message === daMessage) {
            return false;
        }
    }
}

Date.prototype.getUTCTime = function () {
    return this.getTime() - (this.getTimezoneOffset() * 60000); // this line gets TimezoneOffset in minutes, and multiplies that to 60,000 to get that time in milliseconds and substract the result from the current local time in milliseconds converting "Date()" to milliseconds using the "getTime()" method
}

function msToTime(duration) { // converts ms Time to a readeable time
    var milliseconds = (duration % 1000) / 1000,
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor(duration / (1000 * 60 * 60));

    if (hours >= 24) {
        var days = Math.floor(hours / 24);
        hours = hours % 24;

        if (days >= 30) {
            days = days % 30;
            var Months = Math.floor(days / 30);
        }
    }

    // hours = (hours < 10) ? "0" + hours : hours;
    // minutes = (minutes < 10) ? "0" + minutes : minutes;

    var fullSeconds = seconds + milliseconds; // milliseconds.toString().split('.')[1]
    // fullSeconds = (seconds < 10) ? "0" + fullSeconds : fullSeconds;

    if (days) {
        return days + "d, " + hours + "h, " + minutes + "m, and " + fullSeconds + "s";
    } else if (Months) {
        return Months + "M, " + days + "d, " + hours + "h, " + minutes + "m, and " + fullSeconds + "s";
    } else {
        return hours + "h, " + minutes + "m, and " + fullSeconds + "s"; 
    }
}

function checkSub(cliente, idk, str) {
    str = JSON.parse(str)
    var endDateMs = str.subscribed ? Date.parse(str.meta.endsAt) : Date.parse(str.cumulative.end); // parse end sub Date ISO string to milliseconds
    var timestamp = new Date().getUTCTime(); // get current UTC time in milliseconds
    if (str.subscribed) { // if the user is subscribed do this
        endDateMs -= timestamp; // substracts the current UTC time in milliseconds from the sub's end Date in milliseconds 
        var subEndDate = msToTime(endDateMs);
        if (str.meta.type === "gift") {
            cliente.say(idk, `The user ${str.username} has been susbscribed to ${str.channel} with a 
            tier ${str.meta.tier} gifted sub from ${str.meta.gift.name} during ${str.cumulative.months} cumulative 
            months with a ${str.streak.months} month strake [Ends/renews in ${subEndDate}]`);
        } else {
            cliente.say(idk, `The user ${str.username} has been susbscribed to ${str.channel} with a 
                tier ${str.meta.tier} ${str.meta.type} sub during ${str.cumulative.months} cumulative 
                months with a ${str.streak.months} month strake [Ends/renews in ${subEndDate}]`);
        }
    } else {
        if (str.cumulative.months) {
            timestamp -= endDateMs;
            var subEndedDate = msToTime(timestamp);
            cliente.say(idk, `${str.username} is not subscribed to ${str.channel} but has had a ${str.cumulative.months} months subscription [Ended ${subEndedDate} ago]`);
        } else if (str.hidden) {
            cliente.say(idk, `The ${str.channel} channel is not partnered/affiliated`);
        } else {
            cliente.say(idk, `The user ${str.username} has never been subscribed to ${str.channel}`);
        }
    }
}

export function getSub(cliente, idk, {...kwargs} = {}) {
    let userSub = kwargs.saParameter ? (kwargs.saParameter[1] ? kwargs.saParameter[1] : kwargs.elContextoPapuBv) : kwargs.elContextoPapuBv;
    let channelSub = kwargs.saParameter ? (kwargs.saParameter[2] ? kwargs.saParameter[2] : kwargs.currChannel) : kwargs.currChannel;
    
    request({ //obtener el codigo fuente
        url: `https://api.ivr.fi/twitch/subage/${userSub}/${channelSub}`,
        json: true
        }, (err, response, body) => {
        let str = (JSON.stringify(body, undefined, 4)); // the "str" is an object here, if you wanna access a property, just do this e.g. "console.log(str.username)" this prints "DarKness_Lalo874"
        if(response.statusCode == 429) {
            cliente.say(idk, `error 429 monkaS`);
        }
        console.log(str);
        checkSub(cliente, idk, str);
    });
}

export async function getFollows(user_id) {
    const options = {method: "GET", headers: {'Client-ID': Client_ID, 'Authorization': `Bearer ${TOKEN}`}};

    let cursor = true;
    var daFollows = [];
    for (let i = 0; cursor; i++) {
        let daURL = `https://api.twitch.tv/helix/users/follows?from_id=${user_id}&first=100`;
        const laTest = await fetch(!i ? daURL : daURL + `&after=${cursor}`, options);
        const daJson = await laTest.json();
        daFollows[i] = daJson;

        cursor = daFollows[i].pagination ? daFollows[i].pagination.cursor : null;
    }

    let daFo = [];

    for (let daResponse of daFollows) {
        daResponse.data.forEach(daFollow => daFo.push(daFollow.to_login));
    }

    return [daFo, daFollows[0].total];
}

export async function getCatsPlayed(followed = false, daGame, {...kwargs} = {}) {

    // abrir twitch sin estar loggeado, abrir la devtool y seleccionar cualquier call a la api gql
    // buscar el header Client-Id
    const client_id = process.env.client_id_gql;

    if (followed) {
        let daPromises = [];
        var streamersPlayed = [];
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const user_id = kwargs.user_id;
        const game = daGame;
        const daFollowsResponse = await getFollows(user_id); // 0 to get follows, 1 to get number of follows
        const following = daFollowsResponse[0];
        const limit = pLimit(25);

        for (let [i, follow] of following.entries()) {
            daPromises.push(limit(() => searchGameVods(follow, client_id, game)));
            // if(i !== following.length - 1) await sleep(2500);
        };

        streamersPlayed = await Promise.all(daPromises);

        streamersPlayed = streamersPlayed.filter(item => item);

        streamersPlayed.forEach((miniArray, deIndex) => {
            for (let [i, daString] of miniArray.entries()) {
                streamersPlayed[deIndex] = daString;
            }
        });

    } else {
        const channel = kwargs.daChannel;
        console.log(channel);
        // tiene que estar bien escrito(no toma GTAV porque twitch lo guarda como Grand Theft Auto V)
        // no importan las mayusculas
        const game = daGame;
        console.log(game);

        var vods = await searchGameVods(channel, client_id, game);
    }

    if (!followed) {

        if (!vods || !vods.length) { // if the response "searchGameVods" is an empty array or is undefined
            return 'No Streamer Sadge';

        } else if (vods[0] === kwargs.daChannel) {
            return 'STREAMER';
        }
    } else {
        return [streamersPlayed, streamersPlayed.length];
    }

    return vods;
};

export async function doPastebinShit(daText, daName) {
    const url = await paste.createPaste({
        code: daText,
        expireDate: "10M",
        name: daName,
        publicity: 0,
    });
    return url;
}

export async function getUserID(userID) {
    const options = {method: "GET", headers: {'Client-ID': Client_ID, 'Authorization': `Bearer ${TOKEN}`}};
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${userID}`, options);
    const json = await response.json();

    return json.data[0].id;
}

export async function gameExists(deGame) {
    const options = {method: "GET", headers: {'Client-ID': Client_ID, 'Authorization': `Bearer ${TOKEN}`}};

    const response = await fetch(`https://api.twitch.tv/helix/games?name=${deGame}`, options);
    const json = await response.json();
    if (!json.data.length) {
        return false;
    } else {
        return true;
    }
}

function secondsToHms(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
};

async function doPrivatebinShit(msg) {
    const key = crypto.randomBytes(32); // getRandomValues(new Uint8Array(32));

    const opts = {
        expire: '10min',        // '5min' | '10min' | '1hour' | '1day' | '1week' | '1month' | '1year' | 'never'
        burnafterreading: 0,    // 0 | 1
        opendiscussion: 0,      // 0 | 1
        output: 'text',         // 'text' | 'json' | 'yaml'
        compression: 'zlib',    // 'none' | 'zlib'
        textformat: 'plaintext' // 'plaintext' | 'markdown'
    };

    const paste = await privatebin.sendText(msg, key, opts);
    paste.url = `https://privatebin.net${paste.url}#${encode(key)}`;
    return paste.url;
}

export async function getComments(vodID) {

    const client_id = process.env.client_id_gql;
    
    const optionsv5 = {method: "GET", headers: {'Client-ID': client_id, 'Accept': 'application/vnd.twitchtv.v5+json'}};

    const options = {method: "GET", headers: {'Client-ID': Client_ID, 'Authorization': `Bearer ${TOKEN}`}};

    const vodRq = await fetch(`https://api.twitch.tv/helix/videos?id=${vodID}`, options);
    const vodData = await vodRq.json();

    const channelName = vodData.data[0].user_login;

    let cursor = true;

    let html = await fs.promises.readFile('./src/ref.html', 'utf-8');
    let htmls = [];

    const globalRq = await fetch(`https://badges.twitch.tv/v1/badges/global/display`, {method: 'GET'});
    const globalBadges = await globalRq.json();

    const subRq = await fetch(`https://badges.twitch.tv/v1/badges/channels/${await getUserID(channelName)}/display`, {method: 'GET'});
    const subBadges = await subRq.json();

    let colors = ['#0000FF', '#8A2BE2', '#5F9EA0', '#D2691E', '#FF7F50', '#1E90FF', '#B22222', '#DAA520', '#008000', '#FF69B4', '#FF4500', '#FF0000', '#2E8B57', '#00FF7F', '#9ACD32'];
    
    let userColor = {};

    let daURL = `https://api.twitch.tv/kraken/videos/${vodID}/comments`;

    for (let l = 0; cursor; l++) {
        
        const response = await fetch(!l ? daURL : `${daURL}?cursor=${cursor}`, optionsv5);
        const json = await response.json();

        cursor = '_next' in json ? json._next : null;
        
        if (l > 790) break;

        for (let comment of json.comments) {
            let userData = {
                offset: comment.content_offset_seconds,
                get badges() {
                    let resultingArray = [];
                    if ('user_badges' in comment.message) {
                        comment.message.user_badges.forEach(e => {
                            for (let badge in globalBadges.badge_sets) {
                                if(badge === e._id) {
                                    if (badge === 'subscriber' || badge === 'bits') {
                                        let versionSubChecker = subBadges.badge_sets[e._id].versions[e.version] ? subBadges.badge_sets[e._id].versions[e.version] : subBadges.badge_sets[e._id].versions[Object.keys(subBadges.badge_sets[e._id].versions)[0]];
                                        resultingArray.push([versionSubChecker.title, versionSubChecker.image_url_1x, versionSubChecker.image_url_2x, versionSubChecker.image_url_4x]);
                                    } else {
                                        let versionGlobalChecker = globalBadges.badge_sets[e._id].versions[e.version] ? globalBadges.badge_sets[e._id].versions[e.version] : globalBadges.badge_sets[e._id].versions[Object.keys(globalBadges.badge_sets[e._id].versions)[0]];
                                        resultingArray.push([versionGlobalChecker.title, versionGlobalChecker.image_url_1x, versionGlobalChecker.image_url_2x, versionGlobalChecker.image_url_4x]);
                                    }
                                }
                            }
                        });
                        return resultingArray;
                    } else {
                        return [];
                    }
                },
                username: comment.commenter.display_name,
                get user_link() {
                    return `https://twitch.tv/${this.username}`;
                },
                get message() {
                    if('fragments' in comment.message) {
                        let frag = comment.message.fragments.map(fragment => {
                            if (/\w{2}\.\w{2}/.test(fragment.text) && fragment.text.includes(' ')) {

                                return fragment.text.split(/(\s)/).map(txt => { return {text: txt}; });
                            } else {
                                return fragment;
                            }
                        });
                        return [].concat(...frag);
                    }
                    if('emoticons' in comment.message) { // if is highlight message
                        let emoticons = [];

                        comment.message.body.split(/(\s)/).forEach((word, i) => {
                            emoticons.push({text: word});
                            comment.message.emoticons.forEach(emote => {
                                if (word.includes(comment.message.body.slice(emote.begin - 1, emote.end))) { // to detect in which part of the string is the emote
                                    emoticons[i].emoticon = {emoticon_id: emote._id};
                                }
                            });    
                        });
                        return emoticons;
                    }
                    return [{text: comment.message.body}]; // if is highlight message and doesnt have emotes
                }
            }

            if (!userColor[userData.username])
                userColor[userData.username] = comment.message.user_color ? comment.message.user_color : colors[Math.floor(Math.random() * colors.length)];

            html += `<li><span class="timestamp">${secondsToHms(userData.offset)} </span>`;

            if (userData.badges.length) {
                for (let [badgeName, badgeLink1, badgeLink2, badgeLink4] of userData.badges) {
                    html += `<img alt="${badgeName}" title="${badgeName}" class="chat-badge" src="${badgeLink1}" srcset="${badgeLink1} 1x, ${badgeLink2} 2x, ${badgeLink4} 4x">`;
                }
            }

            html += `<a class="user-display-link" target="_blank" href="${userData.user_link}"><span class="user-display" style="color: ${userColor[userData.username]}">${userData.username}</span></a><span class="text-fragment">: `;

            userData.message.forEach(message => {
                if('emoticon' in message) {
                    let emoteLink = 'https://static-cdn.jtvnw.net/emoticons/v2/{0}/default/dark'.format(message.emoticon.emoticon_id);
                    html += `<span><img class="chat-image chat-line__message--emote" src="${emoteLink}/1.0" srcset="${emoteLink}/1.0 1x, ${emoteLink}/2.0 2x, ${emoteLink}/3.0 4x"></span>`;
                } else if (/\w{2}\.\w{2}/.test(message.text)) {
                    let whitespaceRe = message.text.match(/\s+/);
                    if(!message.text.trimStart().startsWith('https://')) message.text = whitespaceRe ? `${whitespaceRe}https://${message.text}` : `https://${message.text}`;
                    html += `<a class="user-display-link" href="${message.text}"><span>${message.text}</span></a>`;
                } else {
                    html += `<span class="text-fragment">${message.text}</span>`;
                }
            });

            html += `</span></li>`;

            if (html.match(/\<li\>/ig).length >= 3000) {
                html += `</body>\n\n</html>`;
                htmls.push(html);
                html = await fs.promises.readFile('./src/ref.html', 'utf-8');
            }
        }

        if (!cursor && !(html.match(/\<li\>/ig).length > 3000)) {
            html += `</body>\n\n</html>`;
            htmls.push(html);
        }
    }

    if (htmls.length > 0) {
        let hlrq = [];
        for (let hl of htmls) {
            hlrq.push(await doPrivatebinShit(hl));
        }
        return hlrq;
    } else {
        html += `</body>\n\n</html>`;
        let hlpaste = await doPrivatebinShit(html);
        return hlpaste;
    }
}