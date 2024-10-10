import axios from "axios";

class CanonCameraControl {
    constructor(cameraIP, sessionID = null) {
        this.cameraIP = cameraIP;
        this.baseURL = `http://${this.cameraIP}/-wvhttp-01-`;
        this.sessionID = sessionID;
        this.keepAliveInterval = null;  // Store the interval for session keep-alive
    }

    // Function to open a session
    async openSession() {
        try {
            const response = await axios.get(`${this.baseURL}/open.cgi`);
            const sessionIDMatch = response.data.match(/s:=(\w+-\w+)/);  // Extract full session ID
            if (sessionIDMatch) {
                this.sessionID = sessionIDMatch[1];
                console.log('Session opened with ID:', this.sessionID);
                this.startKeepAlive();  // Start the keep-alive process
            } else {
                console.error('Failed to extract session ID from response');
            }
        } catch (error) {
            console.error('Error opening session:', error.message);
        }
    }

    // Function to start session keep-alive
    startKeepAlive() {
        if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);  // Clear any existing keep-alive
        }

        this.keepAliveInterval = setInterval(async () => {
            if (!this.sessionID) return;  // If session is closed, don't proceed
            try {
                await axios.get(`${this.baseURL}/info.cgi`, {
                    params: { s: this.sessionID }
                });
            } catch (error) {
                console.error('Keep-alive failed:', error.message);
            }
        }, 55000);  // Send request every 55 seconds to keep session alive
    }

    // Function to scale joystick input to speed
    scaleJoystickInput(value) {
        // Convert joystick value (-1 to +1) to speed (10 to 10,000)
        const minSpeed = 10;
        const maxSpeed = 10000;

        // Ensure the joystick value is in the range -1 to +1
        const clampedValue = Math.max(-1, Math.min(value, 1));

        // Scale the absolute value to the speed range
        const speed = Math.floor(minSpeed + (Math.abs(clampedValue) * (maxSpeed - minSpeed)));
        return speed;
    }

    // Function to control pan and tilt using joystick input
    async controlPanTilt(joystickX, joystickY) {
        if (!this.sessionID) {
            console.error('No session available. Open a session first.');
            return;
        }

        // Determine direction and speed based on joystick input
        const panDirection = joystickX < 0 ? 'left' : 'right';
        const tiltDirection = joystickY < 0 ? 'up' : 'down';

        const panSpeed = this.scaleJoystickInput(joystickX); // Scale joystick X to pan speed
        const tiltSpeed = this.scaleJoystickInput(joystickY); // Scale joystick Y to tilt speed

        try {
            const response = await axios.get(`${this.baseURL}/control.cgi`, {
                params: {
                    s: this.sessionID,
                    [`pan`]: panDirection,
                    [`pan.speed`]: panSpeed,
                    [`tilt`]: tiltDirection,
                    [`tilt.speed`]: tiltSpeed
                }
            });

            //console.log(`Pan/Tilt control response: ${response.data}`);
        } catch (error) {
            console.error('Error controlling Pan/Tilt:', error.message);
        }
    }

    // Function to close the session
    async closeSession() {
        if (!this.sessionID) {
            console.error('No session available to close.');
            return;
        }

        try {
            const response = await axios.get(`${this.baseURL}/close.cgi`, {
                params: { s: this.sessionID }
            });
            this.sessionID = null;
            this.stopKeepAlive();  // Stop the keep-alive process when session closes
            console.log('Session closed:', response.data);
        } catch (error) {
            console.error('Error closing session:', error.message);
        }
    }

    // Stop the keep-alive process
    stopKeepAlive() {
        if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);
            this.keepAliveInterval = null;
            console.log('Keep-alive stopped.');
        }
    }
}

export default CanonCameraControl;
