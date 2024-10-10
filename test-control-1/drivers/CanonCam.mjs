import { AbstractDriver } from '@splcode/state-server';

import CanonCameraControl from '../canon-xc/canonCameraControl.mjs'



export default class CanonCam extends AbstractDriver {
    pVal = 0;
    tVal = 0;
    ptVal = {x:0,y:0};
    camera;

    async _connect() {

        this.camera = new CanonCameraControl('192.168.20.112');

        // Open a session with the camera
        await this.camera.openSession();

        setInterval(() => {
            // this.camera.controlPanTilt(this.pVal, this.tVal)
            this.camera.controlPanTilt(this.ptVal.x, this.ptVal.y)
        }, 100)

        // Control the camera's pan and tilt
        this._registerMeter('pan', this.pVal);
        this._registerMeter('tilt', this.tVal);
        this._registerMeter('pt', this.ptVal);

    }

    async _disconnect() {
    }

    async _get(meterName) {
        if (meterName === 'pan'){
            return this.pVal
        } else if (meterName === 'tilt') {
            return this.tVal
        }
    }

    async _set(meterName, value) {
        if (meterName === 'pan'){
            this.pVal = value
        } else if (meterName === 'tilt') {
            this.tVal = value
        }
        this.ptVal = value
    }
}
