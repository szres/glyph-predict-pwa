<script>
	import Nav from './nav.svelte';
	import Home from './home.svelte';
	import Overclock from './overclock.svelte';
	import Normal from './normal.svelte';

	import { onMount } from 'svelte';
	import { state } from './store.js';
	const pages = new Map();
	pages.set('home', Home);
	pages.set('overclock', Overclock);
	pages.set('normal', Normal);

	onMount(() => {
		const storedState = localStorage.getItem('state');
		state.set(storedState || 'home');
		state.subscribe((value) => {
			localStorage.setItem('state', value);
		});
	});
</script>

<Nav {state} />
<div class="flex flex-col grow">
	<svelte:component this={pages.get($state)} />
</div>
