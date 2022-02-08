import React, { useEffect, useRef, useState } from "react";

let drawCircle;
class Particle {
	constructor(){
		this.x = Math.random() * window.innerWidth;
		this.y = Math.random() * window.innerHeight;
		this.speedX = Math.random() * 4;
		this.speedY = Math.random() * 4;
		this.size = Math.random() * (window.innerWidth / 4);
		this.maxSize = window.innerWidth / 2;
		this.colors = [
			{r:45, g:74, b:227},
			{r:250, g:255, b:89},
			{r:255, g:104, b:248},
			{r:44, g:209, b:252},
			{r:54, g:233, b:84}
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
	draw(){
		drawCircle(this.x, this.y, this.size, this.colors[this.idx]);
	}
}
class WavePoint {
	constructor(idx, x, y){
		this.x = x;
		this.y = y;
		this.fixedY = y;
		this.speed = 0.02;
		this.cur = idx;
		this.max = Math.random() * 100 + 150;
	}
	update(){
		this.cur += this.speed;
		this.y = this.fixedY + (Math.sin(this.cur) * this.max);
	}
}
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
			// moveY -= (window.innerHeight / 2);
			
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

class WaveGroup {
	constructor(){
		this.totalWaves = 4;
		this.totalPoints = 6;

		this.color = ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.4)"];

		this.waves = [];

		for(let i=0; i < this.totalWaves; i++){
			const wave = new Wave(i, this.totalPoints, this.color[i]);
			this.waves[i] = wave;
		}
	}

	resize(){
		for(let i=0; i<this.totalWaves; i++){
			const wave = this.waves[i];
			wave.resize(window.innerWidth, window.innerHeight);
		}
	}

	draw(ctx){
		for(let i=0; i<this.totalWaves; i++){
			const wave = this.waves[i];
			wave.draw(ctx);
		}
	}
}

class TextStyle {
	constructor(){
		this.x = window.innerWidth / 4;
		this.y = window.innerHeight / 2;
		this.texts = [
			{text:"COLLECT", x:this.x, y:-120},
			{text:"ART EXHIBITION", x:this.x, y:0},
			{text:"PERFORMANCE", x:this.x, y:120},
			{text:"INFORMATION", x:this.x, y:240},
		];
		this.opacity = 1;
	}
	update(){
		for(let i=0; i<this.texts.length; i++){
			this.opacity -= 0.002;
			if(i%2 === 0){ // 홀수 
				this.texts[i].x -= 5;
				
				if(this.texts[i].x < -100){
					this.texts[i].x = -100;
				}
			}else{
				this.texts[i].x += 5;
				
				if(this.texts[i].x > window.innerWidth / 1.7){
					this.texts[i].x = window.innerWidth / 1.7;
				}
			}
		}
	}
	draw(ctx){
		ctx.font = "normal bold 120px sans-serif";
		ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
		// ctx.textAlign = "center";
		for(let i=0; i<this.texts.length; i++){
			ctx.beginPath();
			ctx.fillText(this.texts[i].text, this.texts[i].x, this.y + this.texts[i].y);
			ctx.closePath();
		}
	}
}

const Canvas=()=>{
  const [windowSize, setWindowSize] = useState({
		width:window.innerWidth,
		height:window.innerHeight
	});
	const canvasRef = useRef(null);
	const [ctx, setCtx] = useState();
	let particleArray = [];
	const waveGroup = new WaveGroup();
	const textStyle = new TextStyle();

	let resizeTimer
  let windowSizer = () => { 
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(()=>{
      setWindowSize({
				width:document.body.clientWidth,
				height:document.body.clientHeight
			});
			waveGroup.resize(windowSize.width, windowSize.height);
    },10);
  }

	const canvasEvt=()=>{
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		setCtx(ctx);
		animate();
	}

	const animate=()=>{
		if(ctx!==undefined){
			ctx.clearRect(0, 0, windowSize.width, windowSize.height);
			ctx.globalCompositeOperation = 'saturation';
			handleParticles();
			drawWave();
			drawText();
			requestAnimationFrame(animate);
		}
	}

	drawCircle=(x, y, size, colors)=>{
		if(ctx!==undefined){
			ctx.beginPath();
			var gradient = ctx.createRadialGradient(x, y, size*0.1, x-10, y-10, size+40);
			gradient.addColorStop(0, "rgba(" + colors.r + "," + colors.g + "," + colors.b +", 1)");
			gradient.addColorStop(1, "rgba("+ colors.r + "," + colors.g + "," + colors.b +", 0)");
			ctx.fillStyle =  gradient;
			ctx.arc(x , y, size, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}

	const drawWave=()=>{
		if(ctx !== undefined) {
			ctx.globalCompositeOperation = 'normal';
			waveGroup.draw(ctx);
		}
	}

	const drawText=()=>{
		if(ctx !== undefined){
			textStyle.update();
			textStyle.draw(ctx);
		}
	}

	const init=()=>{
		for(let i=0; i<10; i++){
			particleArray.push(new Particle());
		}
	}
	init();

	const handleParticles=()=>{
		for(let i=0; i<particleArray.length; i++){
			particleArray[i].update();
			particleArray[i].draw();
		}
	}
	
	useEffect(()=>{
		canvasEvt();
    window.addEventListener('resize', windowSizer);

    return()=>{
      window.removeEventListener("resize", windowSizer);
    }
	})

	return(
		<div className="canvas-vis" style={{width:windowSize.width, height:windowSize.height}}>
			<canvas id="canvasVis" ref={canvasRef} width={windowSize.width} height={windowSize.height}></canvas>
		</div>
	)
}

export default Canvas;