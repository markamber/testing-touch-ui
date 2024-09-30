<script lang="ts">
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { onMount, onDestroy } from "svelte";
    import { Progress } from "$lib/components/ui/progress/index.js";

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

            console.log(meters)
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
        <div class="slider-meter">
            <Slider
                    value={[slider]}
                    max={10}
                    min={-100}
                    step={1}
                    class="max-w-[70%]"
                    onValueChange={(e) => updateSliderValue(index, e[0])}
            />
            <Progress value={meters[index]} max={100} class="w-[60%]" />
        </div>
    {/each}
</div>

<style>
    .sliders-meters {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .slider-meter {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
</style>
