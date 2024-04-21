<script>
	import Glyph from './Glyph.svelte';
	export let guess = [];
	let validGuess;
	$: validGuess = guess.filter((g) => g.score > 0).slice(0, 5);
	$: if (validGuess.length == 0) {
		validGuess.push({ points: '', name: '-', score: 0 });
	}
</script>

<div class="flex flex-row">
	{#each validGuess as glyph}
		<div class="flex flex-col text-center">
			<Glyph glyph={glyph.points} />
			{glyph.name}
		</div>
	{/each}
</div>
