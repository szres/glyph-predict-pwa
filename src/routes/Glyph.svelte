<script>
	import { onMount } from 'svelte';
	export let width = 64;
	export let height = 64;
	export let background = '#0000';
	export let glyph = 'bmdkcl-';

	let cx = width / 2;
	let cy = height / 2;
	let R = height / 2 - 2;
	const glyphK1 = 0.76;
	const glyphK2 = 0.38;
	const glyphPoints = {
		m: { dx: 0 * glyphK1, dy: -R * glyphK1 },
		d: { dx: +Math.cos(Math.PI / 6) * R * glyphK1, dy: -Math.sin(Math.PI / 6) * R * glyphK1 },
		k: { dx: +Math.cos(Math.PI / 6) * R * glyphK1, dy: Math.sin(Math.PI / 6) * R * glyphK1 },
		c: { dx: 0 * glyphK1, dy: +R * glyphK1 },
		l: { dx: -Math.cos(Math.PI / 6) * R * glyphK1, dy: Math.sin(Math.PI / 6) * R * glyphK1 },
		b: { dx: -Math.cos(Math.PI / 6) * R * glyphK1, dy: -Math.sin(Math.PI / 6) * R * glyphK1 },
		f: { dx: 0 * glyphK2, dy: -R * glyphK2 },
		r: { dx: +Math.cos(Math.PI / 6) * R * glyphK2, dy: -Math.sin(Math.PI / 6) * R * glyphK2 },
		j: { dx: +Math.cos(Math.PI / 6) * R * glyphK2, dy: Math.sin(Math.PI / 6) * R * glyphK2 },
		p: { dx: 0 * glyphK2, dy: +R * glyphK2 },
		h: { dx: -Math.cos(Math.PI / 6) * R * glyphK2, dy: Math.sin(Math.PI / 6) * R * glyphK2 },
		t: { dx: -Math.cos(Math.PI / 6) * R * glyphK2, dy: -Math.sin(Math.PI / 6) * R * glyphK2 },
		a: { dx: 0, dy: 0 }
	};

	let canvas;
	let context;
	onMount(() => {
		context = canvas.getContext('2d');
		context.lineWidth = 2;
		context.strokeStyle = '#47df';
		let hexagon = [
			{ dx: 0, dy: -R },
			{ dx: +Math.cos(Math.PI / 6) * R, dy: -Math.sin(Math.PI / 6) * R },
			{ dx: +Math.cos(Math.PI / 6) * R, dy: Math.sin(Math.PI / 6) * R },
			{ dx: 0, dy: +R },
			{ dx: -Math.cos(Math.PI / 6) * R, dy: Math.sin(Math.PI / 6) * R },
			{ dx: -Math.cos(Math.PI / 6) * R, dy: -Math.sin(Math.PI / 6) * R }
		];
		context.beginPath();
		hexagon.forEach((point) => {
			context.lineTo(cx + point.dx, cy + point.dy);
		});
		context.closePath();
		context.stroke();

		context.strokeStyle = '#ccc7';
		context.lineWidth = 1;
		for (const key in glyphPoints) {
			context.beginPath();
			context.arc(cx + glyphPoints[key].dx, cy + glyphPoints[key].dy, 1.4, 0, 2 * Math.PI);
			context.closePath();
			context.stroke();
		}

		context.strokeStyle = '#eee';
		context.lineWidth = 2;
		context.beginPath();
		glyph.split('').forEach((g) => {
			if (glyphPoints[g]) {
				context.lineTo(cx + glyphPoints[g].dx, cy + glyphPoints[g].dy);
			} else {
				if (g === '-') {
					context.closePath();
				}
			}
		});
		context.stroke();
	});
</script>

<canvas {width} {height} style:background bind:this={canvas} />
