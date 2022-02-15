import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import waterVideo from "../../assets/video/water-video.mp4";
import WaveGroup from "./wave/WaveGroup";
import WaterCircle from  "./WaterCircle";
import CircleParticle from "./CircleParticle";

let isCanvas = false;
class TextStyle {
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.fontSize = 120;
		this.x = this.width / 2;	
		this.y = this.height / 2;
		this.opacity = 1;
		if(this.width > 768 && this.width <= 1024){
			this.fontSize = this.fontSize - 40;
		}else if(this.width <= 768){
			this.fontSize = this.fontSize - 60;
		}
		this.texts = [
			{text:"COLLECT", x:this.x, y:-this.fontSize},
			{text:"ART EXHIBITION", x:this.x, y:0},
			{text:"PERFORMANCE", x:this.x, y:this.fontSize},
			{text:"INFORMATION", x:this.x, y:this.fontSize*2},
		];
	}
	update(type, scrollPosition){
		for(let i=0; i<this.texts.length; i++){
			if(type === "down"){
				if(this.opacity > 0){
					this.opacity -= 0.005;
				}else{
					this.opacity = 0;
				}
			}else{
				if(this.opacity < 1){
					this.opacity += 0.005;
				}else{
					this.opacity = 1;
				}
			}

			if(i%2 === 0){
				if(type === "down"){
					this.texts[i].x -= (scrollPosition / 50);
				}else{
					if(this.texts[i].x < this.width / 2){
						this.texts[i].x += (scrollPosition / 25);
					}else{
						this.texts[i].x = this.width / 2;
					}
					// console.log(this.texts[i].x , this.opacity);
				}
				
				if(this.texts[i].x < 0){
					this.texts[i].x = 0;
				}
			}else{
				if(type === "down"){
					this.texts[i].x += (scrollPosition / 50);	
				}else{
					if(this.texts[i].x > this.width / 2){
						this.texts[i].x -= (scrollPosition / 25);
					}else{
						this.texts[i].x = this.width / 2;
					}
				}
				
				if(this.texts[i].x > this.width){
					this.texts[i].x = this.width;
				}
			}

			if(scrollPosition < 50) {
				this.opacity = 1;
			}
		}
	}
	draw(ctx){
		if(this.opacity > 0){
			ctx.save();
			ctx.beginPath();
			ctx.globalAlpha = 1;
			ctx.font = "normal bold "+ this.fontSize +"px sans-serif";
			ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
			ctx.textAlign = "center";
			for(let i=0; i<this.texts.length; i++){
				ctx.beginPath();
				ctx.fillText(this.texts[i].text, this.texts[i].x, this.y + this.texts[i].y);
				ctx.closePath();
			}
			ctx.restore();
		}
		if(this.blackOpacity === 0.7) {
			isCanvas = true;
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
	const textStyle = new TextStyle(windowSize.width, windowSize.height);
	const waterCircle = new WaterCircle(windowSize.width, windowSize.height);

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
		let myReq = "";
		if(ctx!==undefined){
			ctx.clearRect(0, 0, windowSize.width, windowSize.height);
			ctx.save();
			ctx.globalCompositeOperation = 'saturation';
			ctx.globalAlpha = 1;
			handleParticles();
			drawWave();
			textStyle.draw(ctx);
			ctx.restore();
			if(!isCanvas) {
				myReq = requestAnimationFrame(animate);
			}else{
				cancelAnimationFrame(myReq);
			}
		}
	}
	
	const drawWave=()=>{
		if(ctx !== undefined) {
			ctx.globalCompositeOperation = 'normal';
			waveGroup.draw(ctx);
		}
	}

	const init=()=>{
		for(let i=0; i<10; i++){
			particleArray.push(new CircleParticle());
		}
	}
	init();

	const handleParticles=()=>{
		for(let i=0; i<particleArray.length; i++){
			particleArray[i].update();
			particleArray[i].draw(ctx);
		}
	}

	let type = null;
	let scrollPosition = 0;
	let alpha = 0;
	const scrollEvt=()=>{
		if(scrollPosition < window.scrollY){
			type = "down";
		}else{
			type = "up";
		}

		if(scrollPosition < $(".canvas-vis").height()/2.5){
			textStyle.update(type, scrollPosition);
			textStyle.draw(ctx);
			alpha = 0;
		}else if(scrollPosition >= $(".canvas-vis").height()/2.5 && scrollPosition < $("#footer").offset().top){
			if(type === "down"){
				if(alpha < 1) {
					alpha += 0.1;
				}
			}else if(type === "up"){
				if(alpha > 0){
					alpha -= 0.1;
				}
			}
			waterCircle.draw(ctx, alpha);
		}
		scrollPosition = window.scrollY;
	}

	
	useEffect(()=>{
		canvasEvt();
    window.addEventListener("resize", windowSizer);
		window.addEventListener("scroll", scrollEvt);

    return()=>{
      window.removeEventListener("resize", windowSizer);
			window.removeEventListener("scroll", scrollEvt);
    }
	})

	return(
		<div className="canvas-vis">
			<div className="fixed-ob" style={{width:windowSize.width, height:windowSize.height}}>
				<canvas id="canvasVis" ref={canvasRef} width={windowSize.width} height={windowSize.height}></canvas>
				<video autoPlay muted loop id="waterVideo">
					<source src={waterVideo} type="video/mp4" />
				</video>
			</div>
		</div>
	)
}

export default Canvas;