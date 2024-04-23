<script>
	import Glyph from './Glyph.svelte';
	export let selection = [
		{
			points: 'bdratb',
			handler: () => {
				predictionDepth = 3;
			}
		},
		{
			points: 'bdjhb',
			handler: () => {
				predictionDepth = 4;
			}
		},
		{
			points: 'mbhjdm',
			handler: () => {
				predictionDepth = 5;
			}
		}
	];

	export let predictionDepth = 0;
</script>

{#each selection as s}
	<Glyph glyph={s.points} clickHandler={s.handler} backgroundColor="#44b9" />
{/each}
