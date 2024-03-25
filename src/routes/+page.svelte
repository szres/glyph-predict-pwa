<script>
	import Nav from './nav.svelte';
	import Home from './home.svelte';
	import Overclock from './overclock.svelte';
	import Normal from './normal.svelte';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let state = writable('home');
	onMount(() => {
		const storedState = localStorage.getItem('state');
		state = writable(storedState);
		state.subscribe((value) => {
			localStorage.setItem('state', value);
		});
	});
</script>

<Nav {state} />
{#if $state === 'overclock'}
	<Overclock />
{:else if $state === 'normal'}
	<Normal />
{:else}
	<Home {state} />
{/if}
