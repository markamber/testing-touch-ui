import { useConnectedState, useIsConnected } from '@splcode/state-client';


function TestMeters() {
    const [jimValue, jimLocked, setJimValue] = useConnectedState('jim/thingy');
    const [garyValue, garyLocked, setGaryValue] = useConnectedState('gary/thingy');
    const [meter1] = useConnectedState('cart/mixer/meter1');
    const isConnected = useIsConnected();

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
            Jim: {jimValue}
            <input type='range'
                   value={jimValue}
                   disabled={jimLocked}
                   onChange={(e) => setJimValue(parseInt(e.target.value))}
            />

            <hr/>
            <hr/>
            <hr/>
            Is Connected: {isConnected.toString()}
            <hr/>
            <hr/>
            <hr/>
            meter 1 {meter1}
            <hr/>
            <hr/>

            Gary: {garyValue}
            <input type='range'
                   value={garyValue}
                   disabled={garyLocked}
                   onChange={(e) => setGaryValue(parseInt(e.target.value))}
            />
        </div>
    );
}

export default TestMeters;