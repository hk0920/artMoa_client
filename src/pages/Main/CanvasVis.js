import React, { useEffect, useRef, useState } from "react";

let drawCircle;
class particle {
	constructor(){
		this.x = Math.random() * window.innerWidth;
		this.y = Math.random() * window.innerHeight;
		this.speedX = Math.random() * 2 - 1.5;
		this.speedY = Math.random() * 2 - 1.5;
		this.colorG = Math.floor(Math.random() * 256);
		this.colorB = Math.floor(Math.random() * 256);
		this.size = Math.random() * window.innerWidth + 1;
		this.maxSize = window.innerWidth / 2;
	}
	update(){
		this.x -= this.speedX;
		this.y -= this.speedY;
		this.size += 1;
		if(this.size > this.maxSize){
			this.size -= 1;
		}

		if(this.x < 0 || this.x > window.innerWidth){
			this.x = Math.random() * window.innerWidth;
		}
		
		if(this.y < 0 || this.y > window.innerHeight){
			this.y = Math.random() * window.innerHeight;
		}
	}
	draw(){
		drawCircle(this.x, this.y, this.size, this.colorG, this.colorB);
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
			ctx.globalCompositeOperation = 'saturation';
			handleParticles();
			requestAnimationFrame(animate);
		}
	}

	drawCircle=(x, y, size, colorG, colorB)=>{
		if(ctx!==undefined){
			ctx.beginPath();
			var gradient = ctx.createRadialGradient(x, y, size*0.1, x-10, y-10, size+40);
			gradient.addColorStop(0, "rgba(0," + colorG + "," + colorB +", 1)");
			gradient.addColorStop(1, "rgba(0," + colorG + "," + colorB +", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(x , y, size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	const init=()=>{
		for(let i=0; i<15; i++){
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
		<div className="canvas-vis" style={{width:windowSize.width, height:windowSize.height}}>
			<canvas id="canvasVis" ref={canvasRef} width={windowSize.width} height={windowSize.height}></canvas>
		</div>
	)
}

export default Canvas;