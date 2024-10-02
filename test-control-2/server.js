const express = require('express');
const { client } = require('./state');
const cors = require('cors');
const { state, updateSliders, updateMeters } = require('./meters'); // Manage state externally


const app = express();
const port = 3000;

app.use(cors());


app.get('/getstate', (req, res) => {
    res.json(client.record.getRecord('qsys/faders/1').get()); // Send JSON response
});

const startServer = () => {


    const server = app.listen(port, '0.0.0.0', 551, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    return server;
};

module.exports = { startServer };
