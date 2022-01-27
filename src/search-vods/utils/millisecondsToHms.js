function millisecondsToHms(milliseconds) {
    milliseconds = Number(milliseconds);
    const h = Math.floor(milliseconds / (1000 * 60 * 60)),
    m = Math.floor((milliseconds / (1000 * 60)) % 60),
    s = Math.floor((milliseconds / 1000) % 60);

    return `${h}h${m}m${s}s`;
}

module.exports = millisecondsToHms;
