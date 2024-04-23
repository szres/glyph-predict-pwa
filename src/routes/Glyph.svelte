<script>
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { GlyphEffect } from './glyphParticle.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let width = 64;
	export let height = 64;
	export let background = '#0000';
	export let backgroundColor = '#0000';
	export let outlineColor = '#47df';
	export let glyph = '';
	export let drawable = false;
	export let guess = { points: '', name: '-', score: 0 };
	export let clickHandler = () => {};

	let cx;
	let cy;
	let R;
	let lineWidth;

	$: cx = width / 2;
	$: cy = height / 2;
	$: R = height / 2 - 2;
	$: lineWidth = Math.log(width * 0.04) / 0.618;

	const glyphK = 0.38;
	const glyphK1 = glyphK * 2;
	const glyphK2 = glyphK;
	let glyphPoints;
	$: glyphPoints = {
		m: { dx: 0 * glyphK1, dy: -R * glyphK1 },
		d: { dx: +Math.cos(Math.PI / 6) * R * glyphK1, dy: -Math.sin(Math.PI / 6) * R * glyphK1 },
		k: { dx: +Math.cos(Math.PI / 6) * R * glyphK1, dy: Math.sin(Math.PI / 6) * R * glyphK1 },
		c: { dx: 0 * glyphK1, dy: +R * glyphK1 },
		l: { dx: -Math.cos(Math.PI / 6) * R * glyphK1, dy: Math.sin(Math.PI / 6) * R * glyphK1 },
		b: { dx: -Math.cos(Math.PI / 6) * R * glyphK1, dy: -Math.sin(Math.PI / 6) * R * glyphK1 },
		// f: { dx: 0 * glyphK2, dy: -R * glyphK2 },
		r: { dx: +Math.cos(Math.PI / 6) * R * glyphK2, dy: -Math.sin(Math.PI / 6) * R * glyphK2 },
		j: { dx: +Math.cos(Math.PI / 6) * R * glyphK2, dy: Math.sin(Math.PI / 6) * R * glyphK2 },
		// p: { dx: 0 * glyphK2, dy: +R * glyphK2 },
		h: { dx: -Math.cos(Math.PI / 6) * R * glyphK2, dy: Math.sin(Math.PI / 6) * R * glyphK2 },
		t: { dx: -Math.cos(Math.PI / 6) * R * glyphK2, dy: -Math.sin(Math.PI / 6) * R * glyphK2 },
		a: { dx: 0, dy: 0 }
	};
	const segmentNormalize = (segment) => {
		segment = segment.toLowerCase().substring(0, 2);
		let c0 = segment.charAt(0);
		let c1 = segment.charAt(1);
		if (c1 > c0) {
			return segment;
		} else {
			return c1 + c0;
		}
	};
	const segmentsFromPoints = (points) => {
		if (points.length > 1) {
			let segments = [];
			for (let index = 0; index < points.length - 1; index++) {
				segments.push(segmentNormalize(points.substring(index, index + 2)));
			}
			return segments;
		}
		return [];
	};
	let glyphJson = {};
	const glyphJsonLoad = async () => {
		let response = await fetch('glyphs.json');
		glyphJson = await response.json();
		for (const key in glyphJson) {
			glyphJson[key].segments = segmentsFromPoints(glyphJson[key].points);
		}
	};
	const guessGlyphFromSegments = (segments) => {
		let guessed = [];
		for (const key in glyphJson) {
			let score = 0;
			segments.forEach((segment) => {
				if (glyphJson[key].segments.includes(segment)) {
					score++;
				} else {
					score--;
				}
			});
			score /= glyphJson[key].segments.length;
			guessed.push({ name: glyphJson[key].name, score, points: glyphJson[key].points });
		}
		guessed.sort((a, b) => b.score - a.score);
		if (guessed.length > 0 && guessed[0].score > 0) {
			return guessed[0];
		}
		return { name: '-', score: 0, points: '' };
	};
	let canvas;
	let ctx_render;
	let touchTop, touchLeft;
	let layer_bg = document.createElement('canvas');
	let ctx_bg = layer_bg.getContext('2d');
	let layer_draw = document.createElement('canvas');
	let ctx_draw = layer_draw.getContext('2d');
	let layer_effect = document.createElement('canvas');
	let effect;
	let effect_update;
	let glyph_render;
	const drawGlyph = (points) => {
		ctx_draw.reset();
		ctx_draw.strokeStyle = '#eee';
		ctx_draw.lineWidth = 2;
		ctx_draw.beginPath();
		points.split('').forEach((g) => {
			if (glyphPoints[g]) {
				ctx_draw.lineTo(cx + glyphPoints[g].dx, cy + glyphPoints[g].dy);
			} else {
				if (g === '-') {
					ctx_draw.closePath();
				}
			}
		});
		ctx_draw.stroke();
		ctx_render.reset();
		ctx_render.drawImage(layer_bg, 0, 0, width, height);
		ctx_render.drawImage(layer_draw, 0, 0, width, height);
	};

	let ready = false;
	beforeUpdate(() => {});
	afterUpdate(() => {
		if (!ready || drawable) {
			return;
		}
		drawGlyph(glyph);
	});
	onMount(() => {
		if (width < 32 || height < 32) {
			console.assert(false, 'Glyph must be at least 32x32');
		}
		if (drawable) {
			glyphJsonLoad();
			canvas.addEventListener('mousedown', drawStart);
			canvas.addEventListener('touchstart', drawStartOnTouch);
			canvas.addEventListener('mouseup', drawEnd);
			canvas.addEventListener('touchend', drawEnd);
			canvas.addEventListener('mouseleave', drawEnd);
			canvas.addEventListener('mousemove', drawMove);
			canvas.addEventListener('touchmove', drawMoveOnTouch);
		} else {
			canvas.addEventListener('click', clickHandler);
		}
		ctx_render = canvas.getContext('2d');
		layer_bg.width = width;
		layer_bg.height = height;
		layer_draw.width = width;
		layer_draw.height = height;
		layer_effect.width = width;
		layer_effect.height = height;

		let hexagonPoint = [
			{ dx: 0, dy: -R },
			{ dx: +Math.cos(Math.PI / 6) * R, dy: -Math.sin(Math.PI / 6) * R },
			{ dx: +Math.cos(Math.PI / 6) * R, dy: Math.sin(Math.PI / 6) * R },
			{ dx: 0, dy: +R },
			{ dx: -Math.cos(Math.PI / 6) * R, dy: Math.sin(Math.PI / 6) * R },
			{ dx: -Math.cos(Math.PI / 6) * R, dy: -Math.sin(Math.PI / 6) * R }
		];
		let hexagon = new Path2D();
		hexagon.moveTo(cx + 0, cy - R);
		hexagonPoint.forEach((point) => {
			hexagon.lineTo(cx + point.dx, cy + point.dy);
		});
		hexagon.closePath();

		ctx_bg.lineWidth = 2;
		ctx_bg.strokeStyle = outlineColor;
		ctx_bg.fillStyle = backgroundColor;
		ctx_bg.fill(hexagon);
		ctx_bg.stroke(hexagon);

		ctx_bg.strokeStyle = '#ccc7';
		ctx_bg.lineWidth = 1;
		for (const key in glyphPoints) {
			ctx_bg.beginPath();
			ctx_bg.arc(cx + glyphPoints[key].dx, cy + glyphPoints[key].dy, lineWidth, 0, 2 * Math.PI);
			ctx_bg.closePath();
			ctx_bg.stroke();
		}
		ctx_bg.save();
		if (drawable) {
			ctx_render.drawImage(layer_bg, 0, 0, width, height);
			const { top, left } = canvas.getBoundingClientRect();
			touchTop = top;
			touchLeft = left;
			effect = new GlyphEffect(layer_effect);
			effect_update = effect.updater();
			glyph_render = glyphDrawRender();
		} else {
			drawGlyph(glyph);
		}
		ready = true;
		return () => {
			if (glyph_render) {
				glyph_render.stop();
			}
		};
	});

	let isDrawing = false;
	let currentPointOn = '';
	let pointDrawed = '';
	let segmentsDrawed = [];
	let lastCheckStep = {};
	let drawHue = 0;
	let drawWidth = 0;
	let drawPos = { x: 0, y: 0 };
	const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
	const drawCheck = ({ offsetX: x, offsetY: y }) => {
		for (const key in glyphPoints) {
			if (key === currentPointOn) continue;
			const { dx, dy } = glyphPoints[key];
			if (distance(x, y, cx + dx, cy + dy) < (R * glyphK) / 3) {
				if (glyphPoints[currentPointOn]) {
					const sx = cx + glyphPoints[currentPointOn].dx;
					const sy = cy + glyphPoints[currentPointOn].dy;
					drawHue += 7;
					if (drawHue > 360) drawHue = 0;
					drawWidth -= 0.3;
					if (drawWidth < 2) drawWidth = 2;
					ctx_draw.strokeStyle = `hsla(` + `${drawHue}` + `,90%,72%,60%)`;
					ctx_draw.lineWidth = drawWidth;
					ctx_draw.beginPath();
					ctx_draw.moveTo(sx, sy);
					ctx_draw.lineTo(cx + dx, cy + dy);
					ctx_draw.closePath();
					ctx_draw.stroke();
				}
				if (!pointDrawed.includes(key)) {
					ctx_draw.fillStyle = `hsla(` + `${drawHue}` + `,90%,72%,100%)`;
					ctx_draw.arc(cx + dx, cy + dy, drawWidth * 0.6, 0, 2 * Math.PI);
					ctx_draw.fill();
				}
				currentPointOn = key;
				pointDrawed += key;
				segmentsDrawed = segmentsFromPoints(pointDrawed);
				if (segmentsDrawed.length >= 1) {
					let guessNew = guessGlyphFromSegments(segmentsDrawed);
					if (guessNew.name !== guess.name) {
						guess = guessNew;
						dispatch('newGuess', {
							guess: guess
						});
					}
				}
				if (pointDrawed.length >= 32) drawEnd();
				break;
			}
		}
	};
	const glyphDrawRender = () => {
		const fpsInterval = 1000 / 60;
		let then = Date.now();
		let stoped = true;

		const render = () => {
			if (stoped) return;
			const now = Date.now();
			const delta = now - then;
			if (delta > fpsInterval) {
				then = now - (delta % fpsInterval);
				if (isDrawing) {
					effect.spawn(drawPos.x, drawPos.y);
				}
				if (effect_update() > 0) {
					ctx_render.reset();
					ctx_render.drawImage(layer_bg, 0, 0, width, height);
					ctx_render.drawImage(layer_draw, 0, 0, width, height);
					ctx_render.drawImage(layer_effect, 0, 0, width, height);
				} else {
					stoped = true;
				}
			}
			requestAnimationFrame(render);
		};
		const start = () => {
			if (!stoped) return;
			then = Date.now();
			stoped = false;
			requestAnimationFrame(render);
		};
		const stop = () => {
			stoped = true;
		};
		return { start, stop };
	};
	const drawStart = ({ offsetX: x, offsetY: y }) => {
		isDrawing = true;
		lastCheckStep = { x, y };
		drawPos = { x, y };
		pointDrawed = '';
		segmentsDrawed = [];
		currentPointOn = '';
		drawHue = 0;
		drawWidth = lineWidth * 2;
		ctx_draw.reset();
		ctx_draw.strokeStyle = `hsla(0,90%,72%,80%)`;
		ctx_draw.lineWidth = drawWidth;
		ctx_draw.fillStyle = ctx_draw.strokeStyle;
		drawCheck({ offsetX: x, offsetY: y });
		glyph_render.start();
	};
	const drawStartOnTouch = (e) => {
		const { clientX, clientY } = e.touches[0];
		drawStart({
			offsetX: clientX - touchLeft,
			offsetY: clientY - touchTop
		});
		e.preventDefault();
	};
	const drawEnd = () => {
		if (isDrawing) {
			if (guess.score > 0) {
				dispatch('newResult', {
					result: guess
				});
			}
			guess = { points: '', name: '-', score: 0 };
		}
		isDrawing = false;
	};
	const drawMove = ({ offsetX: x1, offsetY: y1 }) => {
		if (!isDrawing) return;
		const { x, y } = lastCheckStep;
		drawPos = { x: x1, y: y1 };
		if (distance(x, y, x1, y1) >= (R * glyphK) / 6) {
			lastCheckStep = { x: x1, y: y1 };
			drawCheck({ offsetX: x1, offsetY: y1 });
			for (let index = 0; index < 2; index++) {
				effect.spawn(x1, y1, 'slow');
			}
		}
	};
	const drawMoveOnTouch = (e) => {
		const { clientX, clientY } = e.touches[0];
		drawMove({
			offsetX: clientX - touchLeft,
			offsetY: clientY - touchTop
		});
		e.preventDefault();
	};
</script>

<canvas class="self-center" {width} {height} style:background bind:this={canvas} />
{#if drawable}
	<div>
		<span>
			{pointDrawed}
		</span>
	</div>
{/if}
