let state = {
    sliders: Array(8).fill(0),
    audioMeters: Array(8).fill(0),
};

// Function to update sliders
const updateSliders = (sliders) => {
    state.sliders = sliders;
};

// Function to update meters
const updateMeters = (meters) => {
    state.audioMeters = meters;
};

module.exports = { state, updateSliders, updateMeters };
