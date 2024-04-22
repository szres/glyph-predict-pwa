<script>
	import Glyph from './Glyph.svelte';
	import { onMount } from 'svelte';
	let guess = { points: '', name: '-', score: 0 };
	let innerHeight;
	let innerWidth;
	let drawSize = {
		width: 400,
		height: 400
	};
	onMount(() => {
		// TODO:
		// let size = Math.round(Math.min(innerWidth*0.95, innerHeight/2.2))
		// drawSize = { width: size, height: size }
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth />
<div class="flex justify-center pb-2">
	<div class="flex flex-col">
		<Glyph glyph={guess.points} />
		<span class="text-center">{guess.name}</span>
	</div>
</div>
<div class="flex justify-center">
	<Glyph {...drawSize} drawable="true" on:newGuess={(e) => (guess = e.detail.guess)} on:newResult />
</div>
