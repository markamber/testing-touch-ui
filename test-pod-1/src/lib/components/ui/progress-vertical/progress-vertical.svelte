<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = ProgressPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export let max: $$Props["max"] = 100;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<ProgressPrimitive.Root
		class={cn("bg-primary/20 relative w-2 h-full overflow-hidden rounded-full", className)}
		{...$$restProps}
>
	<div
			class="bg-primary w-full h-full flex-1 transition-all"
			style={`transform: translateY(${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	></div>
</ProgressPrimitive.Root>

