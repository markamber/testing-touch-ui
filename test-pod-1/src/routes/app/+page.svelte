<script lang="ts">
    import { SliderVertical } from "$lib/components/ui/slider-vertical/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { onMount, onDestroy } from "svelte";
    import { ProgressVertical } from "$lib/components/ui/progress-vertical/index.js";

    let sliders = Array(8).fill(50); // Default slider values (8 sliders)
    let meters = Array(8).fill(0);   // Audio meter values (8 meters)
    let socket: WebSocket;

    // Function to send slider values as an array of 8 values to the WebSocket server
    function sendSliderValues() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ sliders }));  // Send the array of 8 slider values
        }
    }

    // Set up WebSocket on component mount
    onMount(() => {
        socket = new WebSocket("ws://localhost:3000"); // Adjust WebSocket URL if necessary

        // Handle incoming messages from WebSocket (updating meter values)
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.audioMeters) {
                // Reassign the `meters` array to trigger Svelte's reactivity
                meters = [...data.audioMeters]; // Ensure that we create a new array
            }

        };

        // Clean up WebSocket connection on component destruction
        onDestroy(() => {
            if (socket) {
                socket.close();
            }
        });
    });

    // Watch for slider value changes and send to WebSocket
    function updateSliderValue(index: number, value: number) {
        sliders[index] = value;
        sendSliderValues(); // Send updated slider values
    }
</script>

<div class="sliders-meters">
    {#each sliders as slider, index}
        <div class="slider-meter ml-8">
            <SliderVertical

                    value={[slider]}
                    max={100}
                    min={0}
                    step={1}
                    onValueChange={(e) => updateSliderValue(index, e[0])}
            />
            <ProgressVertical value={meters[index]} class="h-[300px] w-[5px] mt-5" />
        </div>
    {/each}
</div>

<style>
    .sliders-meters {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .slider-meter {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

    }
</style>
