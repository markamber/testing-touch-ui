import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {notifications} from "@mantine/notifications";

// Define message type constants
interface MessagePayload {
    type: string;
    payload: { faders: number[]; meters: number[] };
}

// Define context shape
interface FaderMeterContextType {
    canSendMessages: boolean;
    sendFaderValues: (faders: number[]) => void;
    faders: number[];
    meters: number[];
    videoIn: VideoIn[];
    videoOut: VideoOut[];
    setVideoOutTo: (videoIn: number, videoOut: number) => void;
}

// Type for video input
interface VideoIn {
    number: number;  // Unique identifier for the video input
    name: string;    // Name or label for the video input
}

// Type for video output
interface VideoOut {
    number: number;  // Unique identifier for the video output
    name: string;    // Name or label for the video output
    inNum: number;   // Number of the video input currently assigned to this output
}


// Create a context for faders and meters
const FaderMeterContext = createContext<FaderMeterContextType | null>(null);
const SOCKET_URL = "ws://172.24.0.106:3001";
const MESSAGE_TYPE = {
    INITIAL_DATA: "INITIAL_DATA",
    UPDATE_FADERS: "UPDATE_FADERS",
    UPDATE_METERS: "UPDATE_METERS",
} as const;

export const FaderMeterProvider = ({ children }: { children: ReactNode }) => {
    // Initialize WebSocket connection
    const { sendMessage: sM, lastMessage, readyState } = useWebSocket(SOCKET_URL, {
        shouldReconnect: () => true,
    });

    // Local state for faders and meters
    const [faders, setFaders] = useState<number[]>(Array(8).fill(-200));
    const [meters, setMeters] = useState<number[]>(Array(8).fill(-200));
    const [videoIn] = useState<VideoIn[]>(
        [
            {
                number: 1,
                name: "Studio SDI"
            },
            {
                number: 2,
                name: "Booth SDI"
            },
            {
                number: 3,
                name: "Cam 1"
            },
            {
                number: 4,
                name: "Cam 2"
            },
            {
                number: 5,
                name: "Cam 3"
            },
            {
                number: 6,
                name: "Auto Cam"
            },
            {
                number: 7,
                name: "Multiview"
            },
        ]
    )
    const [videoOut, setVideoOut] = useState<VideoOut[]>(
        [
            {
                number: 1,
                name: "Studio Display",
                inNum: 1
            },
            {
                number: 2,
                name: "Booth Display",
                inNum: 7
            },
            {
                number: 3,
                name: "Record 1",
                inNum: 3
            },
            {
                number: 4,
                name: "Record 2",
                inNum: 4
            },
            {
                number: 5,
                name: "Record 3",
                inNum: 5
            },
            {
                number: 6,
                name: "Record 4",
                inNum: 6
            },
        ]
    )


    // Check if WebSocket connection is open and ready for sending messages
    const canSendMessages: boolean = readyState === ReadyState.OPEN;

    // Handle incoming WebSocket messages
    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const { type, payload }: MessagePayload = JSON.parse(lastMessage.data);

            switch (type) {
                case MESSAGE_TYPE.INITIAL_DATA:
                    setFaders(payload.faders);
                    setMeters(payload.meters);
                    break;
                case MESSAGE_TYPE.UPDATE_METERS:
                    setMeters(payload.meters);
                    break;
                case MESSAGE_TYPE.UPDATE_FADERS:
                    setFaders(payload.faders);
                    break;
                default:
                    break;
            }
        }
    }, [lastMessage]);

    // Define the sendFaderValues function to send fader updates through the WebSocket connection
    const sendFaderValues = useCallback(
        (newFaders: number[]) => {
            if (canSendMessages) {
                sM(
                    JSON.stringify({
                        type: MESSAGE_TYPE.UPDATE_FADERS,
                        payload: { faders: newFaders },
                    } as MessagePayload),
                );
            }
        },
        [canSendMessages, sM],
    );

    const setVideoOutTo = (videoInNumber: number, videoOutNumber: number) => {
        setVideoOut((prevVideoOut) =>
            prevVideoOut.map(out =>
                out.number === videoOutNumber
                    ? { ...out, inNum: videoInNumber }  // Update inNum for the matching videoOut
                    : out  // Return unchanged for others
            )
        );
        notifications.show({
            title: 'Video Routing Changed',
            message: `input ${videoInNumber} routed to output ${videoOutNumber}`,
        })

    };


    // Render the FaderMeterContext.Provider component and pass the necessary values
    return (
        <FaderMeterContext.Provider value={{ canSendMessages, sendFaderValues, faders, meters, videoIn, videoOut, setVideoOutTo }}>
            {children}
        </FaderMeterContext.Provider>
    );
};

// Define a custom hook to access the faders and meters context
export const useFaderMeterContext = (): FaderMeterContextType | null => useContext(FaderMeterContext);
