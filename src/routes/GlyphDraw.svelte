<script>
	import Glyph from './Glyph.svelte';
	let guess = { points: '', name: '-', score: 0 };
</script>

<div class="flex justify-center pb-2">
	<div class="flex flex-col">
		<Glyph glyph={guess.points} />
		<span class="text-center">{guess.name}</span>
	</div>
</div>
<div class="flex justify-center">
	<Glyph
		width="500"
		height="500"
		drawable="true"
		on:newGuess={(e) => (guess = e.detail.guess)}
		on:newResult
	/>
</div>
