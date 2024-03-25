import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Svelte PWA Template',
				short_name: 'SPWAT',
				description: 'a svelte pwa app template',
				start_url: '/',
				background_color: '#000000',
				theme_color: '#5ac6e6',
				display: 'fullscreen',
				icons: [
					{
						src: 'favicon.png',
						sizes: '256x256',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: 'logo.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			devOptions: {
				enabled: true
			}
		})
	]
});
