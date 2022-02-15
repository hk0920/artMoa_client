let fontSize = 90;
let windowWidth = "";
let windowHeight = "";

class WaterCircle {
	constructor(width, height){
		windowWidth = width;
		windowHeight = height;
	}
	update(){

	}
	draw(ctx, alpha){
		const videoEle = document.querySelector("#waterVideo");

		videoEle.addEventListener("canplaythrough", render());
		console.log(alpha);
		
		ctx.globalAlpha = alpha;

		function render() {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "rgba(0,0,0,"+ (alpha/50) +")";
			ctx.fillRect(0, 0, windowWidth, windowHeight);
			ctx.arc(windowWidth/2, windowHeight/2, 300, 0, Math.PI*2);
			ctx.clip();
			ctx.drawImage(videoEle, 0, 0, windowWidth, windowHeight);
			ctx.restore();
			ctx.fillStyle = "rgba(255,255,255,"+ (alpha + 0.3) +")";
			ctx.font = "normal bold " + fontSize + "px sans-serif";
			ctx.fillText("ART COLLECT", windowWidth/5, windowHeight/2.3);
			ctx.font = "normal bold " + (fontSize + 80)  + "px sans-serif";
			ctx.fillText("artMoa", windowWidth/2.2, windowHeight/1.5);
		  requestAnimationFrame(render);
		}
	}
}

export default WaterCircle;