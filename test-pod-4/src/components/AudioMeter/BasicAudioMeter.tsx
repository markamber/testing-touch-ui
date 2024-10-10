const dBtoValue = (db: number): number => {
    let mm: number;
    if (db >= 10.) {
        mm = 0.;
    } else if (db > -10.) {
        mm = -12. / 5. * (db - 10.);
    } else if (db > -40.) {
        mm = 48. - 12. / 10. * (db + 10.);
    } else if (db > -60.) {
        mm = 84. - 12. / 20. * (db + 40.);
    } else if (db > -200.) {
        mm = 96. - 1. / 35. * (db + 60.);
    } else mm = 100.;

    mm = 100. - mm;

    return mm;
};

const getColorForValue = (db: number): string => {
    if (db >= 0) {
        return "red"; // 0 to 10 dB
    } else if (db >= -20) {
        return "orange"; // -20 to 0 dB
    } else {
        return "green"; // -200 to -20 dB
    }
};

interface MeterProps {
    soundValue: number; // Value in dB
    bars?: number; // Number of bars (optional, defaults to a reasonable value)
    width?: number; // Width of each bar (optional)
    height?: number; // Height of the meter (optional)
    spacing?: number; // Spacing between bars (optional)
}

export const BasicAudioMeter = ({ soundValue, width = 10, height = 100 }: MeterProps) => {

    return (
        <div
            style={{
                position: "relative",
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: 'var(--mantine-color-dark-9)',
            }}
        >
            <div
                style={{
                    position: "absolute",
                    background: getColorForValue(soundValue),
                    borderRadius: `${width / 2}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `scaleY(${dBtoValue(soundValue) / 100})`,
                    transformOrigin: "bottom",
                    transition: "background-color 0.2s ease",
                }}
            />
        </div>
    );
};
