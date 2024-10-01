
let state = {
    audioMeters: Array(8).fill(0),
};

// Function to update meters
const updateMeters = (meters) => {
    state.audioMeters = meters;
};

module.exports = { state, updateMeters };