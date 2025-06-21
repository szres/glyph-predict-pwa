<script>
	import { onMount } from 'svelte';
	import Glyph from './Glyph.svelte';
	import GlyphInput from './GlyphInput.svelte';

	let sequence = [];
	let glyphs = {};
	let guessSequence = [];
	const ocSequenceLoad = async () => {
		let response = await fetch('overclock.json');
		sequence = await response.json();
	};
	const glyphsLoad = async () => {
		let response = await fetch('glyphs.json');
		glyphs = await response.json();
	};
	onMount(() => {
		glyphsLoad();
		ocSequenceLoad();
	});
	let predictionDepth = 0;
	let predictions = [];
	let currentGuessIdx = 0;
	let currentPossibleGuess;
	const currentPossibleGuess_Update = () => {
		currentPossibleGuess = [];
		for (let index = 0; index < guessSequence.length; index++) {
			const guess = guessSequence[index];
			let g = glyphFromName(guess[currentGuessIdx]);
			if (!currentPossibleGuess.includes(g)) {
				currentPossibleGuess.push(g);
			}
		}
	};

	$: newPrediction(predictionDepth);
	const newPrediction = (depth) => {
		guessSequence = [...sequence].filter((c) => {
			if (c.length !== depth) {
				return false;
			}
			return true;
		});
		predictions = [];
		currentGuessIdx = 0;
		currentPossibleGuess_Update();
		for (let index = 0; index < depth; index++) {
			predictions = [...predictions, { name: '', points: '' }];
		}
	};
	const writePrediction = (c) => {
		predictions[currentGuessIdx] = c;
		predictions = predictions;
		currentGuessIdx++;
	};

	const glyphFromName = (name) => {
		for (let index = 0; index < glyphs.length; index++) {
			if (glyphs[index].name.includes(name)) {
				return glyphs[index];
			}
		}
		return null;
	};
	const onNewGuess = (glyph) => {
		if (currentGuessIdx >= predictions.length) {
			return;
		}
		let tempSequence = guessSequence.filter((c) => {
			if (glyph.name.includes(c[currentGuessIdx])) {
				return true;
			}
			return false;
		});
		if (tempSequence.length > 0) {
			writePrediction(glyph);
			if (currentGuessIdx >= predictions.length) {
				currentPossibleGuess = [];
				return;
			}
			guessSequence = tempSequence;
			currentPossibleGuess_Update();
			if (currentPossibleGuess.length == 1) {
				onNewGuess(currentPossibleGuess[0]);
			}
		}
	};
	const onNewResult = (e) => {
		let result = e.detail.result;
		onNewGuess(result);
	};
	const glyphDepth = [
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
</script>

<div class="flex flex-col h-max m-4">
	<div class="flex justify-center mb-4">
		{#if predictionDepth == 0}
			{#each glyphDepth as s}
				<Glyph glyph={s.points} clickHandler={s.handler} backgroundColor="#44b9" />
			{/each}
		{:else}
			<div class="flex flex-col">
				<div class="flex flex-row justify-center">
					<Glyph
						glyph="atarajaha"
						clickHandler={() => {
							predictionDepth = 0;
						}}
						outlineColor="#b449"
						backgroundColor="#b449"
					/>
					<Glyph
						glyph="rthja"
						clickHandler={() => {
							newPrediction(predictionDepth);
						}}
						outlineColor="#b949"
						backgroundColor="#b949"
					/>
				</div>
				<div class="flex flex-row">
					{#each predictions as prediction}
						<Glyph glyph={prediction.points} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<GlyphInput {currentPossibleGuess} on:newResult={onNewResult} />
</div>
