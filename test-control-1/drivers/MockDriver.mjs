import { AbstractDriver } from '@splcode/state-server';

export default class MockDevice extends AbstractDriver {
    thingy = Math.floor(Math.random() * 100);

    async _connect() {
        this.log.info('There is a config!', this.config);
        this._registerMeter('thingy', this.thingy);
    }

    async _disconnect() {
    }

    async _get(meterName) {
        this.thingy += 1;
        return this.thingy % 100;
    }

    async _set(meterName, value) {
        this.log.info('SET', meterName, value);
        this.thingy = value;
    }
}
