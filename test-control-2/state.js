const { DeepstreamClient } = require('@deepstream/client')
const client = new DeepstreamClient('localhost:6020')

client.login({}, () => {
    console.log('Deepstream client connected');
});


module.exports = { client };
