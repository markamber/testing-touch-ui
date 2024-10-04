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
    "#f0f4fa",
    "#e0e5ed",
    "#bcc9dc",
    "#95abcc",
    "#7592bf",
    "#6082b7",
    "#557ab4",
    "#46699f",
    "#3c5d8f",
    "#2f507f"
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
