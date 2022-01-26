require('dotenv').config();

const tmi = require('tmi.js');
const request = require('request');
const fetch = require('node-fetch');
const fs = require('fs');
const admin = require('firebase-admin');
const split = require('shlex').split;

import { findImage, top, getSub, fireConfig, checkList, checkChannel, checkConnection, doPastebinShit, getCatsPlayed, getFollows, getBotID } from './functions';

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

const client = new tmi.client(options)

client.connect();

client.on('connected', (adress, port) => {
    console.log('a');
});

client.on("join", (channel, username) => {
    if(botUserName == username) {
        client.action(channel, `a`)
    }
});

var saBlock = false;

client.on('chat', async(target, ctx, message, self) => {
    // if (self) return;

    const spaces = message.trim();
    const minuscula = spaces.toLowerCase();
    var subredditRegex = /(?<=\,reddit\s+)(\w+)/ig
    var topRegex = /(?<=\,top\s+)(\w+)/ig
    // var checkUser = '#' + ctx.username

    // var isInList = channelNames.includes(checkUser); // channelNames.indexOf(checkUser) !== -1;

    console.log(ctx.username)
    if(target === '#srsarcasmo01' && minuscula === ',join') {
        await checkChannel(db, '#' + ctx.username, client, target, channelNames);
    }
    
    if(minuscula.match(subredditRegex)) {
        var matchedSubreddit = minuscula.match(subredditRegex)
        request({ //obtener el codigo fuente
            url: "https://www.reddit.com/r/" + matchedSubreddit + "/random.json",
            json: true
            }, (err, response, body) => {
            let str = (JSON.stringify(body, undefined, 4));
            if(response.statusCode == 429) {
                client.say(target, `error 429 monkaS`)
            }
            var rege = /((http[s]?|ftp):\/)?\/?(i.redd.it)\/([\w\-\.]+[^#?\s])(png|jpg|gif)/g
            var rege2 = /\/r\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\/([\w\-\.]+)\//g
            findImage(str, rege, rege2, target, client)
        });
    }

    if(minuscula.match(topRegex)) {
        var topSubreddit = minuscula.match(topRegex)
        request({ //obtener el codigo fuente
            url: "https://www.reddit.com/r/" + topSubreddit + ".json?sort=top&t=week",
            json: true
            }, (err, response, body) => {
            let str = (JSON.stringify(body, undefined, 4));
            if(response.statusCode == 429) {
                client.say(target, `error 429 monkaS`)
            }
            var rege = /(?<=(http[s]?|ftp):\/?\/?i\.)redd\.it\/([\w\-\.]+[^#?\s])(png|jpg|gif)/g
            top(str, rege, target, client)
        });
    }
    
    if(minuscula === ',reddit') {
        client.say(target, `,reddit [subreddit]`)
    }
    if(minuscula === ',tonto') {
        client.say(target, `${ctx.username} que TONTO BabyRage`)
    }

    if(minuscula === `,darkness_lalo874`) {
        client.say(target, `ese es un TONTO BabyRage`)
    }

    if(minuscula === `,umaruteichan_spacecat`) {
        client.say(target, `el gano la olimpiada sexual numero 69 FeelsStrongMan Clap`)
    }

    if(minuscula === `,clark_eit`) {
        client.say(target, `ese TONTO es un CERDO 🐷 BabyRage`)
    }

    if(minuscula === `,bridge`) {
        client.say(target, `Subscribe to PiewDiePie for original content TriHard 🌉`)
    }

    if(minuscula === `,como`) {
        client.say(target, `COMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BabyRage`)
    }

    if(minuscula.match(/^\,sa(?![\w\d])/i)) { // if the start of the comment match with ",sa" do this
        if (!saBlock) { // if sa is not blocked/timed out
            var sa = minuscula.split(' ')
            if (sa.length > 3) {
                client.say(target, `NOPERS`)
            } else if (sa.length === 3) {
                getSub(client, target, {saParameter: sa})
            } else {
                var chan = target.replace('#', '')
                if (sa.length === 2) {
                    getSub(client, target, {saParameter: sa, currChannel: chan})
                } else {
                    getSub(client, target, {elContextoPapuBv: ctx.username, currChannel: chan})
                }
            }
            saBlock = true;
            setTimeout(() => {
                saBlock = false;
            }, 5000);
        }
    }

    if(minuscula.match(/^\,streamed(?![\w\d])/i)) { // ,streamed - [streamer] [game] || ["followed"] [game]
        let streamed = split(minuscula);
        if (streamed.length === 3) {
            if (streamed[1] === 'followed') {
                const daUserID = self ? await getBotID(botUserName) : ctx['user-id'];
                const daResponse = await getCatsPlayed(true, streamed[2], {user_id: daUserID});
                if (!daResponse) {
                    client.say(target, `Algo salio mal FeelsDankMan`);
                } else {
                    const daStreamers = daResponse[0].join(', ');
                    const daAmountOfStreamers = daResponse[1];
                    if(daStreamers.length > 500) {
                        const daPaste = await doPastebinShit(daStreamers);
                        client.say(target, `Aqui esta la lista de streamers que han jugado ${streamed[2]} -> ${daPaste} , son ${daAmountOfStreamers} streamers PogChamp`);
                    } else {
                        client.say(target, `${daStreamers}`);
                    }
                }
            } else {
                const daResponse = await getCatsPlayed(false, streamed[2], {daChannel: streamed[1]});
                if (!daResponse) {
                    client.say(target, `Algo salio mal FeelsDankMan`);
                } else if (daResponse === 'STREAMER') {
                    client.say(target, `Si, tu streamer ha stremeado ${streamed[2]}`);
                } else if (daResponse === `No Streamer Sadge`) {
                    client.say(target, `Tu Streamer no ha stremeado esa PORONGA KEKW`);
                }
            }
        }
    }

    if (minuscula === ',channels') {
        console.log(channelNames)
    }

    if (minuscula.match(/^\,echo(?![\w\d])/i) && ctx.username === 'srsarcasmo01') {
        const daEcho = minuscula.split(' ')
        daEcho.shift();
        client.say(target, daEcho.join(' '));
    }

    if (minuscula.match(/^\,myfollows(?![\w\d])/i)) {
        const daBotID = await getBotID(botUserName);
        const myFollows = await getFollows(self ? daBotID : ctx['user-id']);
        let deFollows = myFollows[0].join(', ');
        const daAmountOfFollows = myFollows[1];

        if (deFollows.length > 500) {
            const daPaste = await doPastebinShit(deFollows);
            client.say(target, `aqui esta tu lista de follows ${daPaste} con ${daAmountOfFollows} follows`);
        } else {
            client.say(target, `${deFollows}`);
        }
    }
});
})();