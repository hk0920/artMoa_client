class CircleParticle {
	constructor(){
		this.x = Math.random() * window.innerWidth;
		this.y = Math.random() * window.innerHeight;
		this.speedX = Math.random() * 4;
		this.speedY = Math.random() * 4;
		this.size = Math.random() * (window.innerWidth / 2);
		this.maxSize = window.innerWidth / 2;
		this.colors = [
			{r:236, g:236, b:132},
			{r:255, g:182, b:155},
			{r:162, g:153, b:202},
			{r:124, g:202, b:174},
			{r:0, g:185, b:206}
		];
		this.idx = Math.floor(Math.random() * 5);
	}
	update(){
		this.x += this.speedX;
		this.y += this.speedY;
		this.size += 5;
		if(this.size > this.maxSize){
			this.size -= 5;
		}

		if(this.x < 0){
			this.speedX *= -1;
			this.x += 10;
		}else if(this.x > window.innerWidth){
			this.speedX *= -1;
			this.x -= 10;
		}

		if(this.y < 0){
			this.speedY *= -1;
			this.y += 10;
		}else if(this.y > window.innerHeight){
			this.speedY *= -1;
			this.y -= 10;
		}
		
		if(this.y < 0 || this.y > window.innerHeight){
			this.y = Math.random() * window.innerHeight;
		}
	}
	draw(ctx){
		ctx.beginPath();
		var gradient = ctx.createRadialGradient(this.x, this.y, this.size*0.1, this.x-10, this.y-10, this.size+40);
		gradient.addColorStop(0, "rgba(" + this.colors[this.idx].r + "," + this.colors[this.idx].g + "," + this.colors[this.idx].b +", 1)");
		gradient.addColorStop(1, "rgba("+ this.colors[this.idx].r + "," + this.colors[this.idx].g + "," + this.colors[this.idx].b +", 0)");
		ctx.fillStyle =  gradient;
		ctx.arc(this.x , this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
}

export default CircleParticle;