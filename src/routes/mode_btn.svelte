<script>
	import { state } from './store.js';
	export let logo;
	export let name;
</script>

<button
	class="flex justify-center items-end btnx aspect-square min-w-fit min-w-[240px] max-w-[420px]"
	on:click={() => state.set(name)}
>
	<div class="flex flex-col">
		<div class="logox self-center">
			<svelte:component this={logo} />
		</div>
		<div class="textx self-center pl-4 pr-4 pb-6">
			<h2 class="text-3xl font-bold">{name.toUpperCase()}</h2>
			<p>Glyph predict for {name} glyph hack</p>
		</div>
	</div>
</button>

<style>
	.btnx {
		position: relative;
		border-radius: 3rem;
	}
	.btnx:hover {
		background-color: rgba(75, 85, 228, 0.92);
	}
	.btnx::after {
		border-radius: 3rem;
		overflow: hidden;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(52, 55, 58, 0.82);
		z-index: 2;
	}
	.logox {
		position: absolute;
		top: 0;
		z-index: 1;
	}
	.textx {
		color: rgba(255, 255, 255, 0.01);
		z-index: 3;
	}
</style>
