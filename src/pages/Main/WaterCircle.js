
let alpha = 0;

class WaterCircle {
	draw(ctx){
		const videoEle = document.querySelector("#waterVideo");
		videoEle.addEventListener("canplaythrough", render());
		
		function render() {
			ctx.save();
			ctx.beginPath();
			if(alpha < 1) {
				alpha += 0.002;
			}
			ctx.globalAlpha = alpha;
			ctx.arc(window.innerWidth/2, window.innerHeight/2, 300, 0, Math.PI*2);
			ctx.clip();
			ctx.clearRect(20,20,100,50);
			ctx.drawImage(videoEle, 0, 0, window.innerWidth, window.innerHeight);
			ctx.restore();
			ctx.fillStyle = "#ffffff";
			ctx.font = "normal bold 90px sans-serif";
			ctx.fillText("ART COLLECT", window.innerWidth/4, window.innerHeight/2.3);
			ctx.font = "normal bold 160px sans-serif";
			ctx.fillText("artMoa", window.innerWidth/2, window.innerHeight/1.5);
			requestAnimationFrame(render);
		}
	}
}

export default WaterCircle;