<script lang="ts">
	import {Slider as SliderPrimitive} from "bits-ui";
	import {cn} from "$lib/utils.js";

	type $$Props = SliderPrimitive.Props;

	// The slider value, representing the dB value in an array with one element
	export let value: number[] = [-60];  // Initialize with the starting dB value as an array

	export let className: $$Props["class"] = undefined;
	export { className as class };

	// Function to map dB value back to slider value (0-100) with reverse exponential taper
	function dbToSliderValue(dbValue: number): number {
		if(dbValue === 0) {
			return 0
		}
		const sliderValue = 100 * Math.exp((dbValue - 10) / 25) - 1;
		return Math.min(100, Math.max(0, sliderValue));  // Clamp to [0, 100]
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
	{#each ticks as tick}
		{#if tick['data-value'] === 69}
			<SliderPrimitive.Tick
					{tick}
					class="w-8 h-0.5 bg-primary/20"
			/>
		{/if}
	{/each}

	<!-- Track -->
	<span class="bg-primary/20 relative w-10 h-full grow overflow-hidden rounded-full">
		<SliderPrimitive.Range class="bg-primary absolute w-full "  />
	</span>



	{#each thumbs as thumb}
		<SliderPrimitive.Thumb
				{thumb}
				class="border-primary/50 bg-background focus-visible:ring-ring block h-8 w-8 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
		/>
	{/each}

</SliderPrimitive.Root>
