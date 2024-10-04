import { createTheme, MantineColorsTuple } from "@mantine/core";

const brandColor: MantineColorsTuple = [
    "#e6f6ff",
    "#d4e8fb",
    "#aacef0",
    "#7db2e6",
    "#589bde",
    "#3f8cd9",
    "#3085d8",
    "#2072c0",
    "#1365ad",
    "#00579a"
];

const dust: MantineColorsTuple = [
    "#d1dffb",
    "#395f94",
    "#395f94",
    "#335482",
    "#2c4870",
    "#253d5e",
    "#1e314d",
    "#17263B",
    "#101b29",
    "#070C13"
];


export const theme = createTheme({
    /** Put your mantine theme override here */
    colors: {
        brand: brandColor,
        dust: dust,
    },
    primaryColor: 'brand',
    primaryShade: 6,
});
