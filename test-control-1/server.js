const express = require('express');
const app = express();
const port = 3000;

const startServer = () => {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    return server;
};

module.exports = { startServer };
