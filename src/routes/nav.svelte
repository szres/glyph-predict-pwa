<script>
	export let state;
</script>

<div class="navbar bg-base-100 md:pl-6 md:pr-6">
	<div class="navbar-start">
		<button class="btn btn-outline btn-info btn-xs md:btn-md" on:click={() => state.set('home')}
			>Home</button
		>
	</div>
	<div class="navbar-center">
		{#if $state === 'overclock' || $state === 'normal'}
			<p class="text-xl font-bold">{$state.toUpperCase()}</p>
		{:else}
			<p class="text-xl font-bold">Glyph</p>
			<img alt="logo" src="logo.png" class="h-8 md:h-12" />
			<p class="text-xl font-bold">Predict</p>
		{/if}
	</div>
	<div class="navbar-end">
		<a href="https://github.com/Nigh/glyph-predict-pwa" target="_blank"
			><button class="btn btn-outline btn-warning btn-xs md:btn-md">GitHub</button></a
		>
	</div>
</div>
