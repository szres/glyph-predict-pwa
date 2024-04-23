<script>
	import Glyph from './Glyph.svelte';
	import GlyphDraw from './GlyphDraw.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let currentPossibleGuess = [];
</script>

{#if currentPossibleGuess.length > 12}
	<GlyphDraw on:newResult />
{:else if currentPossibleGuess.length > 1}
	<div class="flex flex-wrap justify-center mb-4">
		{#each currentPossibleGuess as glyph}
			<Glyph
				glyph={glyph.points}
				clickHandler={() => {
					dispatch('newResult', {
						result: glyph
					});
				}}
			/>
		{/each}
	</div>
{/if}
