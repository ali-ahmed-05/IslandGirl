var whitelist = [
    "/api/admin/release",
];

let inWhitelist = (originalUrl) => {
    return whitelist.includes(originalUrl);
}

module.exports = {
    inWhitelist: inWhitelist
};