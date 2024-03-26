import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Ingress Glyph Predict PWA',
				short_name: 'IGP',
				description: 'Ingress Glyph Predict',
				scope: '.',
				start_url: './',
				background_color: '#000000',
				theme_color: '#5ac6e6',
				display: 'fullscreen',
				icons: [
					{
						src: 'favicon.png',
						sizes: '128x128',
						type: 'image/png',
						purpose: 'any'
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
