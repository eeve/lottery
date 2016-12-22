export default {

	constructor() {
	},

	load() {
		this.WINDOW_WIDTH = document.body.offsetWidth;
		this.WINDOW_HEIGHT = document.body.offsetHeight * 3;
		this.num = 500;
		this.stars = [];
		this.mouseX = this.WINDOW_WIDTH / 2;
		this.mouseY = this.WINDOW_HEIGHT / 2;
		this.rnd;

		this.canvas = document.getElementById('star');
		this.canvas.width = this.WINDOW_WIDTH;
		this.canvas.height = this.WINDOW_HEIGHT;
		this.context = this.canvas.getContext('2d');

		this.addStar();
		setInterval(this.render.bind(this), 10);
		this.liuxing();
		document.body.addEventListener('mousemove', this.mouseMove);
	},

	liuxing() {
		var time = Math.round(Math.random() * 3000 + 33);
		setTimeout(() => {
			this.rnd = Math.ceil(Math.random() * this.stars.length)
			this.liuxing();
		}, time)
	},

	mouseMove(e) {
		//因为是整屏背景，这里不做坐标转换
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
	},

	render() {
		this.context.fillStyle = 'rgba(0,0,0,0.1)';
		this.context.fillRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT);
		// context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
		for (var i = 0; i < this.num; i++) {
			var star = this.stars[i];
			if (i == this.rnd) {
				star.vx = -5;
				star.vy = 20;
				this.context.beginPath();
				this.context.strokeStyle = 'rgba(255,255,255,' + star.alpha + ')';
				this.context.lineWidth = star.r;
				this.context.moveTo(star.x, star.y);
				this.context.lineTo(star.x + star.vx, star.y + star.vy);
				this.context.stroke();
				this.context.closePath();
			}
			star.alpha += star.ra;
			if (star.alpha <= 0) {
				star.alpha = 0;
				star.ra = -star.ra;
				star.vx = Math.random() * 0.2 - 0.1;
				star.vy = Math.random() * 0.2 - 0.1;
			} else if (star.alpha > 1) {
				star.alpha = 1;
				star.ra = -star.ra
			}
			star.x += star.vx;
			if (star.x >= this.WINDOW_WIDTH) {
				star.x = 0;
			} else if (star.x < 0) {
				star.x = this.WINDOW_WIDTH;
				star.vx = Math.random() * 0.2 - 0.1;
				star.vy = Math.random() * 0.2 - 0.1;
			}
			star.y += star.vy;
			if (star.y >= this.WINDOW_HEIGHT) {
				star.y = 0;
				star.vy = Math.random() * 0.2 - 0.1;
				star.vx = Math.random() * 0.2 - 0.1;
			} else if (star.y < 0) {
				star.y = this.WINDOW_HEIGHT;
			}
			this.context.beginPath();
			var bg = this.context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
			bg.addColorStop(0, 'rgba(255,255,255,' + star.alpha + ')')
			bg.addColorStop(1, 'rgba(255,255,255,0)')
			this.context.fillStyle = bg;
			this.context.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
			this.context.fill();
			this.context.closePath();
		}
	},

	addStar() {
		for (var i = 0; i < this.num; i++) {
			var aStar = {
				x: Math.round(Math.random() * this.WINDOW_WIDTH),
				y: Math.round(Math.random() * this.WINDOW_HEIGHT),
				r: Math.random() * 3,
				ra: Math.random() * 0.05,
				alpha: Math.random(),
				vx: Math.random() * 0.2 - 0.1,
				vy: Math.random() * 0.2 - 0.1
			}
			this.stars.push(aStar);
		}
	}

}
