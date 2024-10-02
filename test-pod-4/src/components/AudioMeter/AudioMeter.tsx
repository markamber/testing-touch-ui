import { useEffect, useMemo, useRef } from "react";
import "./AudioMeter.module.css";

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

interface MeterProps {
    soundValue: number; // Value in dB
    bars?: number; // Number of bars (optional, defaults to a reasonable value)
    width?: number; // Width of each bar (optional)
    height?: number; // Height of the meter (optional)
    spacing?: number; // Spacing between bars (optional)
    barColor?: string; // Color of the bars (optional)
}

export const AudioMeter = ({
                               soundValue,
                               bars = 30, // default number of bars
                               width = 10, // default width of bars
                               height = 100, // default height of the meter
                               spacing = 2, // default spacing between bars
                               barColor = "lightblue", // default bar color
                           }: MeterProps) => {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const volumeRefs = useRef(new Array(bars).fill(0));

    // Memoize the elements to avoid recreating them on every render
    const elements = useMemo(() => {
        const barsArray = [];

        for (let i = 0; i < bars; i++) {
            barsArray.push(
                <div
                    ref={(ref) => (refs.current[i] = ref)} // Use indexed assignment to avoid multiple refs
                    key={`vu-${i}`}
                    style={{
                        position: "absolute",
                        background: barColor,
                        borderRadius: `${width / 2}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        transformOrigin: "bottom", // scaleY animation will occur from the bottom of each bar
                        left: i * (width + spacing) + "px",
                    }}
                />
            );
        }

        return barsArray;
    }, [bars, width, height, spacing, barColor]); // Only recreate elements if these values change

    useEffect(() => {
        let animationFrameId: number;

        const updateMeter = () => {
            const visualValue = dBtoValue(soundValue);
            volumeRefs.current.unshift(visualValue);
            volumeRefs.current.pop();

            for (let i = 0; i < refs.current.length; i++) {
                if (refs.current[i]) {
                    refs.current[i]!.style.transform = `scaleY(${volumeRefs.current[i] / 100})`;
                }
            }

            animationFrameId = requestAnimationFrame(updateMeter);
        };

        animationFrameId = requestAnimationFrame(updateMeter);

        return () => cancelAnimationFrame(animationFrameId);
    }, [soundValue]); // Removed `bars` from dependencies, it's only needed initially

    return (
        <div
            style={{
                position: "relative",
                width: bars * (width + spacing) + "px",
                height: `${height}px`,
            }}
        >
            {elements} {/* Render memoized elements */}
        </div>
    );
};
