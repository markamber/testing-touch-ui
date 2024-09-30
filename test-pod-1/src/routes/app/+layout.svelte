<script>
	import '../../app.css';
    import Triangle from "lucide-svelte/icons/triangle";
    import { Button } from "$lib/components/ui/button/index";
    import Bot from "lucide-svelte/icons/bot";
    import Clock from "$lib/components/util/clock/Clock.svelte";
    import LifeBuoy from "lucide-svelte/icons/life-buoy";
</script>

<div class="flex min-h-screen w-full flex-col">
    <header class="bg-background sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6">
        <Clock/>
    </header>
    <aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div class="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
                <Triangle class="fill-foreground size-5" />
            </Button>
        </div>
        <nav class="grid gap-1 p-2">
            <Button
                    variant="ghost"
                    size="icon"
                    class="rounded-lg"
                    aria-label="Models"
            >
                <Bot class="size-5" />
            </Button>
        </nav>
        <nav class="mt-auto grid gap-1 p-2">
            <Button
                    variant="ghost"
                    size="icon"
                    class="mt-auto rounded-lg"
                    aria-label="Help"
            >
                <LifeBuoy class="size-5" />
            </Button>
        </nav>
    </aside>
    <main
            class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10"
    >
        <slot></slot>
    </main>

</div>

