const express = require('express');
const app = express();
const port = 3000;


const cors = require('cors');
const { state, updateSliders, updateMeters } = require('./state'); // Manage state externally

app.use(cors());


app.get('/getstate', (req, res) => {
    res.json(state); // Send JSON response
});

const startServer = () => {


    const server = app.listen(port, '0.0.0.0', 551, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    return server;
};

module.exports = { startServer };
