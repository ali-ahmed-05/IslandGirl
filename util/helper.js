let decodeHash = (hash) => {
    let newHash = ''
    for (let i = 0; i < hash.length; i++) {
        if (i % 2 == 0) {
            newHash += hash[i]
        }
    }
    return newHash
}

module.exports = {
    decodeHash: decodeHash
};