import React, { useEffect, useRef, useState } from "react";

let drawCircle;
class particle {
	constructor(){
		this.x = Math.random() * window.innerWidth;
		this.y = Math.random() * window.innerHeight;
		this.speedX = Math.random() * 2 - 1.2;
		this.speedY = Math.random() * 2 - 1.2;
		this.colorR = Math.floor(Math.random() * 256);
		if(window.innerWidth < 767){
			this.size = Math.random() * 5 + 1;
		}else{
			this.size = Math.random() * 15 + 1;
		}
	}
	update(){
		this.x -= this.speedX;
		this.y -= this.speedY;
		
		if(this.x > window.innerWidth || this.x < 0){
			this.x = Math.random() * window.innerWidth;
		}
		if(this.y > window.innerHeight || this.y < 0){
			this.y = Math.random() * window.innerHeight;
		}
	}
	draw(){
		drawCircle(this.x, this.y, this.size, this.colorR);
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

	let resizeTimer
  let windowSizer = () => { 
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(()=>{
      setWindowSize({
				width:document.body.clientWidth,
				height:document.body.clientHeight
			});
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
			handleParticles();
			requestAnimationFrame(animate);
		}
	}

	drawCircle=(x, y, size, r)=>{
		if(ctx!==undefined){
			ctx.fillStyle = "rgba(" +  r + "," + 0 + "," +  0 + "," + 0.8 +")";
			ctx.beginPath();
			ctx.ellipse(x , y, size , 7, Math.PI / 4, 0, 2 * Math.PI);
			ctx.fill();
		}
	}

	const init=()=>{
		for(let i=0; i<200; i++){
			particleArray.push(new particle());
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
		<canvas id="canvasBg" ref={canvasRef} width={windowSize.width} height={windowSize.height}></canvas>
	)
}

export default Canvas;