<script>
	import Glyph from './Glyph.svelte';
	import GlyphGuess from './GlyphGuess.svelte';

	let guess = [];
</script>

<div class="grid grid-flow-row gap-4 h-max m-4 justify-center content-center">
	<ul class="steps">
		<li data-content="?" class="step step-neutral"><Glyph glyph="bhcjd" />DEFEND</li>
		<li data-content="?" class="step step-neutral"><Glyph glyph="trjch-" />HUMAN</li>
		<li data-content="?" class="step step-neutral"><Glyph glyph="bthjrd" />CIVILIZATION</li>
		<li data-content="?" class="step step-neutral"><Glyph glyph="lhtmrjk" />SHAPERS</li>
		<li data-content="?" class="step step-neutral"><Glyph glyph="htajra" />LIE</li>
	</ul>
	<GlyphGuess bind:guess />
	<div>
		<Glyph width="500" height="500" drawable="true" bind:guess />
	</div>
</div>
