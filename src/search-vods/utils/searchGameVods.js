const getVodsMoments = require("./getVodsMoments");
const millisecondsToHms = require("./millisecondsToHms");
const getVods = require("./getVods");

async function searchGameVods(channel, token, game) {
    const response = [];

    const vods = await getVods(channel, token);
    if (vods === 'The channel has no vods') return;
    const moments = await getVodsMoments(token, vods);

    vods.forEach((vod) => {
        // si nunca se cambio la categoria del stream, no aparece ningun momento
        // entonces vamos a sacar el juego de la info del vod en lugar de los momentos
        // con esto tambien conseguimos todos los primeros juegos de los vods
        // entonces vamos a ignorar el primer juego de los fragmentos porque ya esta incluido aca
        const vodGame = vod.node.game;
        /*const id = vod.node.id;
        const url = `https://www.twitch.tv/videos/${id}`;*/

        if (!vodGame) return; // no tiene juego

        if (vodGame.displayName.toLowerCase() == game.toLowerCase()) {
            if (!response[0]) { // if the channel has not been pushed
                response.push(channel); // push(url)
            }
        }
    });

    moments.forEach((moment) => {
        const momentGame = moment.node.details.game;
        const milliseconds = moment.node.positionMilliseconds;
        /*const timestamp = millisecondsToHms(milliseconds);
        const id = moment.node.video.id;
        const url = `https://www.twitch.tv/videos/${id}?t=${timestamp}`;*/

        if (milliseconds == 0) return; // ignoramos el primer juego por lo de antes
        if (!momentGame) return; // no tiene juego
        if (momentGame.displayName.toLowerCase() == game.toLowerCase()) {
            if (!response[0]) { // if the channel has not been pushed
                response.push(channel); // push(url)
            }
        }
    });

    return response;
}

module.exports = searchGameVods;