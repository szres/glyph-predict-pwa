/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				xianii_theme: {
					primary: '#fb7185',
					secondary: '#c084fc',
					accent: '#fde047',
					neutral: '#44403c',
					'base-100': '#1c1917',
					info: '#0ea5e9',
					success: '#22c55e',
					warning: '#f97316',
					error: '#b91c1c'
				}
			}
		]
	}
};
