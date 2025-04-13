function get_time() {
    const now = new Date()
        .toISOString()
        .replace("T"," ")
        .split('.')[0];
    return `[${now}]`;
}

module.exports = {
    get_time
}