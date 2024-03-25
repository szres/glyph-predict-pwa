<script>
	export let state;
</script>

<div class="grid grid-flow-row gap-4 h-max m-4 justify-center content-center">
	<button class="" on:click={() => state.set('overclock')}>
		<div class="card max-w-[420px] image-full hover:border-4">
			<figure><img src="./logo.png" alt="oc" /></figure>
			<div class="card-body items-center self-end">
				<h2 class="card-title">Overclock</h2>
				<p>Glyph predict for overclock hack</p>
			</div>
		</div>
	</button>
	<button class="" on:click={() => state.set('normal')}>
		<div class="card max-w-[420px] image-full hover:border-4">
			<figure><img src="./logo.png" alt="glyph" /></figure>
			<div class="card-body items-center self-end">
				<h2 class="card-title">Normal</h2>
				<p>Glyph predict for normal glyph hack</p>
			</div>
		</div>
	</button>
</div>
