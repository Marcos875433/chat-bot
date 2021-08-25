require('dotenv').config();

const tmi = require('tmi.js');
const request = require('request');
const fetch = require('node-fetch')

import { findImage, top } from './functions';

const botUserName = process.env.botUserName;
const ouathToken = process.env.ouathToken;
const channelNames = process.env.channelNames;

const options = {
    options: {
        debug: true
    },
    identity: {
        username: botUserName,
        password: ouathToken
    },
    channels: [channelNames]
}

const client = new tmi.client(options)

client.connect();

client.on('connected', (adress, port) => {
    client.action(channelNames,  `a`)
})

client.on('chat', (target, ctx, message, self) => {
    if (self) return;

    const spaces = message.trim();
    const minuscula = spaces.toLowerCase();
    var subredditRegex = /(?<=\,reddit\s+)(\w+)/ig
    var topRegex = /(?<=\,top\s+)(\w+)/ig

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
            var rege = /((http[s]?|ftp):\/)?\/?(i.redd.it)\/([\w\-\.]+[^#?\s])(png|jpg|gif)(?=)/g
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
            var rege = /(?<=(http[s]?|ftp):\/?\/?i\.)redd\.it\/([\w\-\.]+[^#?\s])(png|jpg|gif)(?=)/g
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
        client.say(target, `Suscribe to PiewDiePie for original content TriHard 🌉`)
    }

    if(minuscula === `,como`) {
        client.say(target, `COMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO BabyRage`)
    }
});