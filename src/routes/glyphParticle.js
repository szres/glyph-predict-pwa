class Particle {
	constructor() {
		this.alive = false;
	}
	init(x = 0, y = 0, type = 'fast') {
		const angle = Math.random() * Math.PI * 2;
		let force, fade;
		if (type === 'fast') {
			force = Math.random() * 3 + 1.5;
			fade = 0.955;
			this.drag = Math.random() * 0.05 + 0.92;
		} else if (type === 'slow') {
			force = Math.random() * 0.5 + 0.2;
			fade = 0.982;
			this.drag = Math.random() * 0.05 + 0.85;
		}
		this.fade = fade;
		this.x = x;
		this.y = y;
		this.alpha = 1;
		this.alive = true;
		this.theta = angle;
		this.vx = Math.sin(angle) * force;
		this.vy = Math.cos(angle) * force;
		this.rotation = Math.atan2(this.vy, this.vx);
		this.scale = Math.random() * 0.7 + 0.3;
		this.wander = Math.random() * 2 + 2;

		return this;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= this.drag;
		this.vy *= this.drag;

		this.theta += (Math.random() - 0.5) * this.wander;

		this.vx += Math.sin(this.theta) * 0.07;
		this.vy += Math.cos(this.theta) * 0.07;

		this.rotation = Math.atan2(this.vy, this.vx);

		this.alpha *= this.fade;
		this.scale *= 1 - (1 - this.fade) * 0.95;
		this.alive = this.scale > 0.06 && this.alpha > 0.06;
		return this;
	}

	draw(context) {
		context.globalAlpha = this.alpha;
		context.fillStyle = '#fff';
		context.moveTo(this.x, this.y);
		context.arc(this.x, this.y, 6 * this.scale, 0, 2 * Math.PI);
		context.fill();
		return this;
	}
}
function removeItems(array, startIndex, removeCount) {
	const length = array.length;

	if (startIndex >= length || removeCount === 0) {
		return;
	}

	removeCount = startIndex + removeCount > length ? length - startIndex : removeCount;

	const len = length - removeCount;

	for (let i = startIndex; i < len; ++i) {
		array[i] = array[i + removeCount];
	}

	array.length = len;
}

export class GlyphEffect {
	constructor(layer) {
		this.maxParticles = 160;
		this.buffer = document.createElement('canvas');
		this.context = layer.getContext('2d');
		this.buffer.width = layer.width;
		this.buffer.height = layer.height;
		this.bufferContext = this.buffer.getContext('2d');
		this.pool = [];
		this.particles = [];

		this.pointer = {
			x: -9999,
			y: -9999
		};
		console.log('this.context', this.context);
	}

	spawn(x, y, type = 'fast') {
		let particle;

		if (this.particles.length > this.maxParticles) {
			particle = this.particles.shift();
		} else if (this.pool.length) {
			particle = this.pool.pop();
		} else {
			particle = new Particle();
		}

		particle.init(x, y, type);
		this.particles.push(particle);
		return this;
	}
	updater() {
		const context = this.context;
		const particles = this.particles;
		const buffer = this.buffer;
		const bufferContext = this.bufferContext;
		const pool = this.pool;

		const update = () => {
			context.reset();
			bufferContext.globalAlpha = 1;
			bufferContext.reset();
			bufferContext.globalCompositeOperation = 'lighten';

			for (let i = 0; i < particles.length; i++) {
				const particle = particles[i];

				if (particle.alive) {
					particle.update();
				} else {
					pool.push(particle);
					removeItems(particles, i, 1);
				}
			}

			for (let particle of particles) {
				particle.draw(bufferContext);
			}

			context.filter = `none`;
			context.drawImage(buffer, 0, 0);
			context.filter = `blur(10px)`;
			context.drawImage(buffer, 0, 0);
			context.filter = 'none';
			return particles.length;
		};
		return update;
	}
}
