import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
    '#ffe7e7',
    '#ffcece',
    '#ff9b9b',
    '#ff6363',
    '#ff3636',
    '#ff1818',
    '#ff0307',
    '#e40000',
    '#cc0000',
    '#b20000',
];

export const theme = createTheme({
    /** Put your mantine theme override here */
    colors: {
        brand: myColor,
    },
    primaryColor: 'brand',
    primaryShade: 6,
});
