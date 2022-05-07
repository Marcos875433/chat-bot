require('dotenv').config();

const tmi = require('tmi.js');
const request = require('request');
const fetch = require('node-fetch');
const fs = require('fs');
const admin = require('firebase-admin');
const split = require('shlex').split;

import { findImage, top, getSub, fireConfig, checkList, checkChannel, checkConnection, doPastebinShit, getCatsPlayed, getFollows, getUserID, gameExists, getComments, getFollowedStreams } from './functions';

(async() => {

const botUserName = process.env.botUserName;
const ouathToken = process.env.ouathToken;
fireConfig();
const db = admin.database();
var channelNames = await checkList(db);

const options = {
    options: {
        debug: true,
        joinInterval: 2000
    },
    identity: {
        username: botUserName,
        password: ouathToken
    },
    channels: channelNames
}

const client = new tmi.client(options);

client.connect();

client.on('connected', (adress, port) => {
    console.log('a');
});

client.on("join", (target, username) => {
    if(botUserName == username) {
        console.log(target, `a joined to ${target}`); // client.action(target, `a`)
    }
});

var saBlock = false;

var streamedBlock = false;

client.on('chat', async(target, ctx, message, self) => {
    // if (self) return;

    const spaces = message.trim();
    const minuscula = spaces.toLowerCase();
    var subredditRegex = /(?<=\,reddit\s+)(\w+)/ig;
    var topRegex = /(?<=\,top\s+)(\w+)/ig;
    // var checkUser = '#' + ctx.username

    // var isInList = channelNames.includes(checkUser); // channelNames.indexOf(checkUser) !== -1;

    console.log(ctx.username)
    if(target === '#srsarcasmo01' && minuscula === ',join') {
        await checkChannel(db, '#' + ctx.username, client, target, channelNames);
    }
    
    if(minuscula.match(subredditRegex)) {
        var matchedSubreddit = minuscula.match(subredditRegex);
        request({ //obtener el codigo fuente
            url: "https://www.reddit.com/r/" + matchedSubreddit + "/random.json",
            json: true
            }, (err, response, body) => {
            let str = (JSON.stringify(body, undefined, 4));
            if(response.statusCode == 429) {
                client.say(target, `error 429 monkaS`);
            }
            var rege = /((http[s]?|ftp):\/)?\/?(i.redd.it)\/([\w\-\.]+[^#?\s])(png|jpg|gif)/g;
            var rege2 = /\/r\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\//g;
            findImage(str, rege, rege2, target, client);
        });
    }

    if(minuscula.match(topRegex)) {
        var topSubreddit = minuscula.match(topRegex);
        request({ //obtener el codigo fuente
            url: "https://www.reddit.com/r/" + topSubreddit + ".json?sort=top&t=week",
            json: true
            }, (err, response, body) => {
            let str = (JSON.stringify(body, undefined, 4));
            if(response.statusCode == 429) {
                client.say(target, `error 429 monkaS`);
            }
            var rege = /(?<=(http[s]?|ftp):\/?\/?i\.)redd\.it\/([\w\-\.]+[^#?\s])(png|jpg|gif)/g;
            top(str, rege, target, client);
        });
    }
    
    if(minuscula === ',reddit') {
        client.say(target, `,reddit [subreddit]`);
    }
    if(minuscula === ',tonto') {
        client.say(target, `${ctx.username} que TONTO BabyRage`);
    }

    if(minuscula === `,darkness_lalo874`) {
        client.say(target, `ese es un TONTO BabyRage`);
    }

    if(minuscula === `,umaruteichan_spacecat`) {
        client.say(target, `el gano la olimpiada sexual numero 69 FeelsStrongMan Clap`);
    }

    if(minuscula === `,clark_eit`) {
        client.say(target, `ese TONTO es un CERDO 🐷 BabyRage`);
    }

    if(minuscula === `,bridge`) {
        client.say(target, `Subscribe to PiewDiePie for original content TriHard 🌉`);
    }

    if(minuscula === `,como`) {
        client.say(target, `COMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BabyRage`);
    }

    if(minuscula.match(/^\,sa\s?/)) { // if the start of the comment match with ",sa" do this
        if (!saBlock) { // if sa is not blocked/timed out
            var sa = minuscula.split(' ');
            if (sa.length > 3) {
                client.say(target, `NOPERS`);
            } else if (sa.length === 3) {
                getSub(client, target, {saParameter: sa});
            } else if (sa.length < 3) {
                var chan = target.replace('#', '')
                if (sa.length === 2) {
                    getSub(client, target, {saParameter: sa, currChannel: chan});
                } else {
                    getSub(client, target, {elContextoPapuBv: ctx.username, currChannel: chan});
                }
            }
            saBlock = true;
            setTimeout(() => {
                saBlock = false;
            }, 5000);
        }
    }

    if(minuscula.match(/^\,streamed\s[\w\W]+/) && !streamedBlock) { // ,streamed - [streamer] [game] || ["followed"] [game]
        streamedBlock = true;
        let streamed = split(minuscula);
        if (streamed.length === 3) {
            if (streamed[1] === 'followed') {
                if (!await gameExists(streamed[2])) {
                    streamedBlock = false;
                    client.say(target, `El nombre de la categoria o juego es invalido`);
                    return;
                }
                const daUserID = self ? await getUserID(botUserName) : ctx['user-id'];
                const daResponse = await getCatsPlayed(true, streamed[2], {user_id: daUserID});
                if (!daResponse) {
                    client.say(target, `Algo salio mal FeelsDankMan`);
                    streamedBlock = false;
                } else {
                    const daStreamers = daResponse[0].join(', ');
                    const daAmountOfStreamers = daResponse[1];
                    if(daStreamers.length > 500) {
                        const daPaste = await doPastebinShit(daStreamers, 'yourStreamerList.js');
                        client.say(target, `Aqui esta la lista de streamers que han jugado ${split(spaces)[2]} -> ${daPaste} , son ${daAmountOfStreamers} streamers PogChamp`);
                        streamedBlock = false;
                    } else {
                        client.say(target, `${daStreamers}`);
                        streamedBlock = false;
                    }
                }
            } else {
                if (!await gameExists(streamed[2])) {
                    streamedBlock = false;
                    client.say(target, `El nombre de la categoria o juego es invalido`);
                    return;
                }
                const daResponse = await getCatsPlayed(false, streamed[2], {daChannel: streamed[1]});
                if (!daResponse) {
                    client.say(target, `Algo salio mal FeelsDankMan`);
                    streamedBlock = false;
                } else if (daResponse === 'STREAMER') {
                    client.say(target, `Si, tu streamer ha stremeado ${streamed[2]}`);
                    streamedBlock = false;
                } else if (daResponse === `No Streamer Sadge`) {
                    client.say(target, `Tu Streamer no ha stremeado esa PORONGA KEKW`);
                    streamedBlock = false;
                }
            }
        }
    }

    if (minuscula === ',channels') {
        console.log(channelNames);
    }

    if (minuscula.match(/^\,echo\s\w+/) && ctx.username === 'srsarcasmo01') {
        const daEcho = minuscula.split(' ');
        daEcho.shift();
        client.say(target, daEcho.join(' '));
    }

    if (minuscula.match(/^\,myfollows\s\w+/)) {
        const daUserID = await getUserID(botUserName);
        const myFollows = await getFollows(self ? daUserID : ctx['user-id']);
        let deFollows = myFollows[0].join(', ');
        const daAmountOfFollows = myFollows[1];

        if (deFollows.length > 500) {
            const daPaste = await doPastebinShit(deFollows, 'yourStreamerList.js');
            client.say(target, `aqui esta tu lista de follows ${daPaste} con ${daAmountOfFollows} follows`);
        } else {
            client.say(target, `${deFollows}`);
        }
    }

    if(minuscula.match(/^\,getcomments\s\w+/)) {
        let args = minuscula.split(' ');
        if (args.length === 2) {
            let commentsResponse = await getComments(args[1]); // 1 is channel id
            if (commentsResponse instanceof Array) {
                client.say(target, `${commentsResponse.join(' , ')}`);
            } else if (commentsResponse) {
                client.say(target, `${commentsResponse}`);
            }
        } 
    }

    if (minuscula.match(/^\,getfollowedstreams\s[\w\W]+/) && ctx.username == 'srsarcasmo01') {
        console.log('yeabro');
        if (split(minuscula).length > 2) {
            client.say(target, 'Asi no es TONTO BabyRage');
            return;
        }
        if (!await gameExists(split(minuscula)[1])) {
            client.say(target, 'El juego/categoria no existe FeelsDankMan');
            return;
        }
        let daStreams = await getFollowedStreams(ctx['user-id'], split(minuscula)[1]);
        if (daStreams[0] == 'No one is streaming') {
            client.say(target, `Nadie que sigas esta streameando, literalmente`);
            return;
        }
        if (!daStreams[0].length) {
            client.say(target, `Nadie que sigas esta streameando ${split(spaces)[1]}`);
            return;
        }
        let daStreamersString = daStreams[0].join(', ');
        if (daStreamersString.length > 500) {
            const daPaste = await doPastebinShit(daStreamersString, 'yourFollowedStreamsList.js');
            client.say(target, `Estos son los streamers que estan stremeando ${split(spaces)[1]}: ${daPaste} . Son ${daStreams[1]} streams`);
        } else {
            client.say(target, `${daStreamersString}`);
        }
    }
});
})();