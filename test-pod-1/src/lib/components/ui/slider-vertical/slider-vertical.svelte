<script lang="ts">
	import {Slider as SliderPrimitive} from "bits-ui";
	import {cn} from "$lib/utils.js";

	type $$Props = SliderPrimitive.Props;

	// The slider value, representing the dB value in an array with one element
	export let value: number[] = [-60];  // Initialize with the starting dB value as an array

	export let className: $$Props["class"] = undefined;
	export { className as class };

	// The min and max dB values your audio hardware works with
	const minDb = -100;  // Minimum dB value (e.g., -60 dB)
	const maxDb = 10;    // Maximum dB value (e.g., 0 dB)

	function scale(val, f0, f1, t0, t1) {
		return ((val - f0) * (t1 - t0)) / (f1 - f0) + t0;
	}

	// Reverse of sliderValueToDb: Maps dB value back to slider value (0-100)
	function dbToSliderValue(dbValue: number): number {
		// Reverse the scale function to map dB value to normalized vol (0 to 1)
		const vol = scale(dbValue, -100, 12, 0, 1);

		// Reverse the logarithmic transformation
		const sliderValue = Math.exp(vol * Math.log(113)) - 101;

		// Return the slider value clamped to [0, 100]
		return Math.min(100, Math.max(0, sliderValue));
	}




	// Function to map slider value (0-100) to real dB value with reverse exponential taper
	function sliderValueToDb(sliderValue: number): number {
		//return sliderValue;
		const vol = 25 * Math.log((sliderValue+1)/100) + 10 ;
		return vol;
	}



	// We need to convert the initial value from dB to slider value
	let sliderValue = [dbToSliderValue(value[0])];  // The slider's internal value (0-100) as an array

	// Whenever the slider changes, we update the `value` array with the real dB value
	function handleSliderChange(sliderVal: number[]) {
		sliderValue = sliderVal;  // Update the internal slider value array
		value = [sliderValueToDb(sliderVal[0])];  // Update the `value` array with the real dB value
		console.log(value[0])
		// Send `value` to your audio hardware here, if necessary
	}

	function proxyValueChange(proxyFn){
		return (e) => {
			handleSliderChange(e);
			proxyFn(value);
		}
	}
</script>

<SliderPrimitive.Root
		bind:value={sliderValue}
		orientation="vertical"
		class={cn("relative flex h-full touch-none select-none justify-center", className)}
		{...$$restProps}
		onValueChange={proxyValueChange($$restProps.onValueChange)}
		let:thumbs
		let:ticks
>
	<!-- Track -->
	<span class="bg-primary/20 relative w-1.5 h-full grow overflow-hidden rounded-full">
		<!-- Range fill (vertical) -->
		<SliderPrimitive.Range class="bg-primary absolute w-full "  />
	</span>

	{#each ticks as tick}

		{#if tick['data-value'] === 69}
			<SliderPrimitive.Tick
					{tick}
					class="w-10 h-0.5 bg-primary/10"
			/>
		{/if}
	{/each}

	{#each thumbs as thumb}
		<!-- Thumb -->
		<SliderPrimitive.Thumb
				{thumb}
				class="border-primary/50 bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
		/>
	{/each}

</SliderPrimitive.Root>
