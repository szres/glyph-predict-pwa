<script>
	import Glyph from './Glyph.svelte';
	import GlyphDraw from './GlyphDraw.svelte';
	let predictionDepth = 5;
	let predictions = [
		{ name: '', points: '' },
		{ name: '', points: '' },
		{ name: '', points: '' },
		{ name: '', points: '' },
		{ name: '', points: '' }
	];
	const newPrediction = () => {
		predictions = [];
		for (let index = 0; index < predictionDepth; index++) {
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
		newPrediction();
		writePrediction(c);
	};
	const onNewResult = (e) => {
		let result = e.detail.result;
		writePrediction(result);
	};
</script>

<div class="flex flex-col h-max m-4">
	<div class="flex justify-center mb-4">
		{#each predictions as prediction}
			<Glyph glyph={prediction.points} />
		{/each}
	</div>
	<GlyphDraw on:newResult={onNewResult} />
</div>
