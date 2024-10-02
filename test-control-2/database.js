// server.js
const { Deepstream } = require('@deepstream/server')
const server = new Deepstream({})

function startDb() {
    server.start();
}

module.exports = { startDb }