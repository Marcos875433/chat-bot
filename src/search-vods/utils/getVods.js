const fetch = require("node-fetch");
const { Vod, gqlAPI } = require("./constants");

async function getVods(channel, client_id) {
    const vods = [];
    let cursor = undefined;

    while (cursor !== null) {
        const body = [
            {
                operationName: Vod.operationName,
                variables: {
                    limit: 100,
                    channelOwnerLogin: channel,
                    broadcastType: "ARCHIVE",
                    videoSort: "TIME",
                    cursor: cursor,
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: Vod.hash,
                    },
                },
            },
        ];

        const options = {
            method: "POST",
            headers: { "Client-Id": client_id },
            body: JSON.stringify(body),
        };

        const response = await fetch(gqlAPI, options);
        const json = await response.json();

        try {
            if (!json[0].data.user) return 'The channel is closed, or has been banned';
            if (!json[0].data.user.videos.edges[0]) return 'The channel has no vods';
            const edges = json[0].data.user.videos.edges;

            edges.forEach((VOD) => {
                vods.push(VOD);
            });

            cursor = edges[0].cursor;

        } catch(err) {
            console.log(err.message);
            console.log('getVods json');
            console.log(json);
        }
    }

    return vods;
}

module.exports = getVods;
