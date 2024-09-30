<script>
    import {onDestroy} from "svelte";

    let time = new Date();

    const updateTime = () => {
        time = new Date();
    };

    // Update the time every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup when the component is destroyed
    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<!-- Display the time in HH:MM:SS format -->
<span>{time.toLocaleTimeString()}</span>

<style>
    h1 {
        font-family: 'Arial', sans-serif;
        font-size: 2rem;
        text-align: center;
        margin: 20px 0;
    }
</style>
