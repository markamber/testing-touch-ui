import { createContext, useContext, useState, ReactNode } from "react";
import {notifications} from "@mantine/notifications";


// Define context shape
interface FaderMeterContextType {
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

export const FaderMeterProvider = ({ children }: { children: ReactNode }) => {

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
        <FaderMeterContext.Provider value={{ videoIn, videoOut, setVideoOutTo }}>
            {children}
        </FaderMeterContext.Provider>
    );
};

// Define a custom hook to access the faders and meters context
export const useFaderMeterContext = (): FaderMeterContextType | null => useContext(FaderMeterContext);
