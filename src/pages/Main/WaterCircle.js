let fontSize = 90;
let windowWidth = "";
let windowHeight = "";
let circleSize = 300;
let textWidth1 = 500;
let textWidth2 = 0;

class WaterCircle {
	constructor(width, height){
		windowWidth = width;
		windowHeight = height;
		if(windowWidth > 1024 && windowWidth <= 1240){
			fontSize = 70;
			console.log("작은 pc")
		}else if(windowWidth > 768 && windowWidth <= 1024){
			fontSize = 70;
			textWidth1 = 350;
			textWidth2 = 100;
			console.log("tablet")
		}else if(windowWidth > 420 && windowWidth <= 768){
			fontSize = 50;
			circleSize = 200;
			textWidth1 = 250;
			textWidth2 = 50;
			console.log("큰 모바일")
		}else if(windowWidth <= 420){
			fontSize = 35;
			circleSize = 100;
			textWidth1 = 150;
			textWidth2 = 50;
			console.log("mobile")
		}
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
			ctx.arc(windowWidth/2, windowHeight/2, circleSize, 0, Math.PI*2);
			ctx.clip();
			ctx.drawImage(videoEle, 0, 0, windowWidth, windowHeight);
			ctx.restore();
			ctx.fillStyle = "rgba(255,255,255,"+ (alpha + 0.3) +")";
			ctx.font = "normal bold " + fontSize + "px sans-serif";
			ctx.fillText("ART COLLECT", (windowWidth/2) - textWidth1, (windowHeight/2) - fontSize);
			ctx.font = "normal bold " + (fontSize + (fontSize-10))  + "px sans-serif";
			ctx.fillText("artMoa", (windowWidth/2) - textWidth2, (windowHeight/2) + (fontSize+40));
		  requestAnimationFrame(render);
		}
	}
}

export default WaterCircle;