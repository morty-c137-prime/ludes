
let Life = require("./life-engine/life");
let LifeConfiguration = require("./life-engine/life-configuration");

let Output = require("./output/output");
let TextOutput = require("./output/text-output");

let out = new Output(new TextOutput());

let config = new LifeConfiguration();
config.width = 41;
config.height = 25;
config.rule = "23/3";

let life = new Life(config);
life.init();
life.fillRandom(0.5);

process.stdout.write('\033[2J');
setInterval(()=>{
	process.stdout.write('\033c');
	life.evolve();
	out.emit(life);
}, 500);