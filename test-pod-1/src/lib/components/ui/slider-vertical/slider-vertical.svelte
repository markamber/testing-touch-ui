<script lang="ts">
	import { Slider as SliderPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SliderPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = [0];
	export { className as class };
</script>

<SliderPrimitive.Root
		bind:value
		orientation="vertical"
		class={cn("relative flex h-full touch-none select-none justify-center", className)}
		{...$$restProps}
		let:thumbs
		let:ticks
>
	<!-- Track -->
	<span class="bg-primary/20 relative w-1.5 h-full grow overflow-hidden rounded-full">
		<!-- Range fill (vertical) -->
		<SliderPrimitive.Range class="bg-primary absolute w-full "  />
	</span>

	{#each ticks as tick}

		{#if tick['data-value'] === 0}
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

