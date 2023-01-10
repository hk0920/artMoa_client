import WavePoint from "./WavePoint";

class Wave {
	constructor(idx, totalPoints, color){
		this.index = idx;
		this.totalPoints = totalPoints;
		this.color = color;
		this.points = [];

		this.resize();
	}

	resize(){
		this.stageWidth = window.innerWidth;
		this.stageHeight = window.innerHeight;

		this.centerX = window.innerWidth / 2;
		this.centerY = window.innerHeight;

		this.pointGap = this.stageWidth / (this.totalPoints -1);

		this.init();
	}

	init(){
		this.points = [];
		
		for(let i=0; i<this.totalPoints; i++){
			const point = new WavePoint(this.index + i, this.pointGap * i, this.centerY);
			this.points[i] = point;
		}
	}

	draw(ctx){
		if(ctx !== undefined) {
			ctx.beginPath();
			ctx.strokeStyle = this.color;
			ctx.lineWidth = 1.5;

			let prevX = this.points[0].x;
			let prevY = this.points[0].y;

			let moveX = prevX;
			moveX -= (window.innerWidth / 2);
			let moveY = prevY;
			
			ctx.moveTo(moveX, moveY);

			for(let i=1; i<this.totalPoints; i++){
				if(i < this.totalPoints-1){
					this.points[i].update();
				}

				const cx = (prevX + this.points[i].x) / 2;
				const cy = (prevY + this.points[i].y) / 2;

				ctx.lineTo(cx, cy);

				prevX = this.points[i].x;
				prevY = this.points[i].y;
			}

			ctx.lineTo(prevX, prevY);
			ctx.lineTo(this.stageWidth, this.stageHeight);
			ctx.lineTo(this.points[0].x, this.stageHeight);

			ctx.stroke();
			ctx.closePath();
		}
	}
}

export default Wave;