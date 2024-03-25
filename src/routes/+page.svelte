<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let count = writable(0);
	let countValue;
	onMount(() => {
		const storedCount = parseInt(localStorage.getItem('count'), 10);
		count = writable(storedCount);
		count.subscribe((value) => {
			countValue = value;
			localStorage.setItem('count', value > 0 ? value : 0);
		});
	});
</script>

<div class="grid justify-items-center w-screen text-center">
	<h1 class="text-2xl">Click Me</h1>
	<button
		class="btn h-full border-0 bg-transparent hover:bg-transparent"
		on:click={() => count.update((n) => n + 1)}
	>
		<div class="avatar justify-center">
			<div class="w-24 mask mask-hexagon">
				<img alt="avatar" src="favicon.png" />
			</div>
		</div>
	</button>
	<span class="text-xl mt-4">Clickcount</span>
	<span class="text-5xl font-bold">{$count}</span>
	<button class="btn btn-md btn-accent mt-2" on:click={() => count.set(0)}>Reset</button>
</div>
