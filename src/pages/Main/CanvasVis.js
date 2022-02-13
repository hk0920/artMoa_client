import React, { useEffect, useRef, useState } from "react";
import waterVideo from "../../assets/video/water-video.mp4";
import WaveGroup from "./wave/WaveGroup";
import WaterCircle from  "./WaterCircle";
import CircleParticle from "./CircleParticle";


let isCanvas = false;
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
		this.blackOpacity = 0;
	}
	update(){
		for(let i=0; i<this.texts.length; i++){
			this.opacity -= 0.002;

			if(this.opacity < 0){
				this.blackOpacity += 0.002;
				if(this.blackOpacity > 0.7){
					this.blackOpacity = 0.7;
				}
			}

			if(i%2 === 0){
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
		if(this.opacity > 0){
			ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
			for(let i=0; i<this.texts.length; i++){
				ctx.beginPath();
				ctx.fillText(this.texts[i].text, this.texts[i].x, this.y + this.texts[i].y);
				ctx.closePath();
			}
		}else{
			ctx.fillStyle = "rgba(0,0,0," + this.blackOpacity +")";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			if(this.blackOpacity === 0.7) {
				isCanvas = true;
			}
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
	const waterCircle = new WaterCircle();

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
			let myReq;
			if(!isCanvas){
				ctx.clearRect(0, 0, windowSize.width, windowSize.height);
				ctx.globalCompositeOperation = 'saturation';
				handleParticles();
				drawWave();
				drawText();
				myReq = requestAnimationFrame(animate);
			}else{
				cancelAnimationFrame(myReq);
				drawWaterCircle();
			}
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

	const drawWaterCircle=()=>{
		if(ctx !== undefined){
			waterCircle.draw(ctx);
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
			<video autoPlay muted loop id="waterVideo">
				<source src={waterVideo} type="video/mp4" />
			</video>
		</div>
	)
}

export default Canvas;