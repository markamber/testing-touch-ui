const { qrcEvents, setFaderValue } = require('./qrcClient');
const { updateMeters } = require('./meters')
const { client } = require('./state')

const qsysFaderList = client.record.getList('qsys/faders');

function addQsysFader( number ) {
    const id = 'qsys/faders/' + number;
    const record = client.record.getRecord( id )
    record.set( 'number', number );
    record.set( 'value', -100 );
    qsysFaderList.addEntry( id );
}

async function startConnector(){

    await qsysFaderList.whenReady()

    // Wait 5 seconds before initializing slider values
    setTimeout(() => {
        console.log('Initializing slider values...');

        for (let i = 1; i <= 8; i++) {
            addQsysFader(i)
        }

        console.log('Sliders initialized');
    }, 5000); // 5-second delay


    // Subscribe to QRC meter updates and update WebSocket clients
    qrcEvents.on('meterUpdate', (meters) => {
        updateMeters(meters); // Update the shared state with new meter values
    });


    // Create postits that have already added
    qsysFaderList.getEntries().forEach(createFader)
    // Create postits as they are added
    qsysFaderList.on('entry-added', createFader)
}


function createFader(entry) {
    console.log(entry);
    client.record.getRecord(entry).subscribe((record) => setFaderValue(record.number, record.value))
}


module.exports = { startConnector }
