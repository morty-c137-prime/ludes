let Life = require("./life-engine/life");
let LifeConfiguration = require("./life-engine/life-configuration");

let Output = require("./output/output");
let TextOutput = require("./output/text-output");

let out = new Output(new TextOutput());

let config = new LifeConfiguration();
config.width = 3;
config.height = 3;
config.rule = "3/23";

let life = new Life(config);
life.init();
life.fillRandom(0.5);

for(let i = 0; i < 10; i++)
{
	life.evolve();
	out.emit(life);
	process.stdout.write('\n');
}