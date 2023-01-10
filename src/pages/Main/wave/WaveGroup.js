import Wave from "./Wave";

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

export default WaveGroup;