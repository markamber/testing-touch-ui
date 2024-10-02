<script lang="ts">
    import { SliderVertical } from "$lib/components/ui/slider-vertical/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { onMount, onDestroy } from "svelte";
    import { ProgressVertical } from "$lib/components/ui/progress-vertical/index.js";
    import {DeepstreamClient} from "@deepstream/client";

    const client = new DeepstreamClient('127.0.0.1:6020')

    client.login()

    const qsysFaderList = client.record.getList('qsys/faders');

    qsysFaderList.whenReady().then(() => {
        console.log(`here are the entries ${qsysFaderList.getEntries()}`)
        qsysFaderList.getEntries().forEach(createFader)
        qsysFaderList.on('entry-added', createFader)
    })


    let sliders =  Array(8).fill(0); // Default slider values (8 sliders)
    let sliderRefs = [];
    let meters = Array(8).fill(0);   // Audio meter values (8 meters)
    let socket: WebSocket;

    // Function to send slider values as an array of 8 values to the WebSocket server
    function sendSliderValues() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ sliders }));  // Send the array of 8 slider values
        }
    }

    function createFader(entry) {
        console.log(`${entry} is the one we are getting`)
        const record = client.record.getRecord(entry)
        record.whenReady().then((record) => {
            const data = record.get()
            console.log(record)
            console.log(data)
            setEntry(entry, data)
        })
        record.subscribe((record) => setEntry(entry, record))

    }

    function setEntry(record, data) {
        data['callback'] = (value) => record.set("value", value)
        sliderRefs[data.number] = data;
        sliderRefs = [...sliderRefs];
        console.log(sliderRefs)
    }

    // Set up WebSocket on component mount
    onMount(() => {
        socket = new WebSocket("ws://127.0.0.1:3000"); // Adjust WebSocket URL if necessary

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

<Card.Root class="w-[1000px]">
    <Card.Content>
    <div class="sliders-meters">
        {#each sliderRefs as slider, index}
            <div class="slider-meter ml-8 mr-8">
                <ProgressVertical
                        value={meters[index]}
                        class="h-[30px] w-[5px] mt-5"
                />
                <SliderVertical
                        value={[slider]}
                        max={100}
                        min={0}
                        class="h-[300px] mt-5"
                        step={1}
                        onValueChange={(e) => updateSliderValue(index, e[0])}
                />

            </div>
        {/each}
    </div>
    </Card.Content>
</Card.Root>


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
