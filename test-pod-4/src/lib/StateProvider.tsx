import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

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
}

// Create a context for faders and meters
const FaderMeterContext = createContext<FaderMeterContextType | null>(null);
const SOCKET_URL = "ws://localhost:3001";
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
    const [faders, setFaders] = useState<number[]>(Array(8).fill(0));
    const [meters, setMeters] = useState<number[]>(Array(8).fill(0));

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

    // Render the FaderMeterContext.Provider component and pass the necessary values
    return (
        <FaderMeterContext.Provider value={{ canSendMessages, sendFaderValues, faders, meters }}>
            {children}
        </FaderMeterContext.Provider>
    );
};

// Define a custom hook to access the faders and meters context
export const useFaderMeterContext = (): FaderMeterContextType | null => useContext(FaderMeterContext);
