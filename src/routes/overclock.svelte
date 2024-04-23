<script>
	import Glyph from './Glyph.svelte';
	import GlyphDraw from './GlyphDraw.svelte';
	import GlyphSelector from './GlyphSelector.svelte';

	let predictionDepth = 0;
	let predictions = [];

	$: newPrediction(predictionDepth);
	const newPrediction = (depth) => {
		predictions = [];
		for (let index = 0; index < depth; index++) {
			predictions = [...predictions, { name: '', points: '' }];
		}
	};
	const writePrediction = (c) => {
		for (let index = 0; index < predictionDepth; index++) {
			if (predictions[index].name === '') {
				predictions[index] = c;
				predictions = predictions;
				return;
			}
		}
		newPrediction(predictionDepth);
		writePrediction(c);
	};
	const onNewResult = (e) => {
		let result = e.detail.result;
		writePrediction(result);
	};
</script>

<div class="flex flex-col h-max m-4">
	<div class="flex justify-center mb-4">
		{#if predictionDepth == 0}
			<GlyphSelector bind:predictionDepth />
		{:else}
			<Glyph
				glyph="atarajaha"
				clickHandler={() => {
					predictionDepth = 0;
				}}
				outlineColor="#b449"
				backgroundColor="#b449"
			/>
			{#each predictions as prediction}
				<Glyph glyph={prediction.points} />
			{/each}
		{/if}
	</div>
	{#if predictionDepth > 0}
		<GlyphDraw on:newResult={onNewResult} />
	{/if}
</div>
