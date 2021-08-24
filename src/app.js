require('dotenv').config();

const tmi = require('tmi.js');
const request = require('request');

import { findImage } from './functions';

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

    if(minuscula.match(subredditRegex)) {
        findImage(target, client, minuscula, subredditRegex)
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