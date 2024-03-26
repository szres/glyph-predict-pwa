<script>
	import { state } from './store.js';
	import LogoOverclock from './logo_overclock.svelte';
	import LogoNormal from './logo_normal.svelte';
	import ModeBtn from './mode_btn.svelte';
</script>

<div class="grid grid-flow-row gap-4 h-full p-4 justify-center content-evenly">
	<ModeBtn logo={LogoOverclock} name="overclock" />
	<ModeBtn logo={LogoNormal} name="normal" />
</div>
