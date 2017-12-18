#!/usr/bin/env node

/**
 * @author Richard Alvarez
 */ 
 
const ludes = require('commander');
const LifeConfiguration = require("./life-engine/life-configuration");
const Cell              = require("./life-engine/cell");
const Life              = require("./life-engine/life");
const Output            = require("./output/output");
const TextOutput        = require("./output/text-output");

/**
 * The Quick command
 * Runs a life set to the set amount of generations and rule (random setup) and then outputs it via
 * console.
 */
ludes
	.command("quick")
	.option("-g --generations <generations to evolve to>", "# of Generations", parseInt)
	.option("--rule <rule>", "Life rule used")
	.option("-w --width <width>", "Width", parseInt)
	.option("-h --height <height>", "Height", parseInt)
	.option("-r --random <randomness>", "Initial randomness", parseFloat)
	.action((options)=>
	{
		let lifeConfig = new LifeConfiguration();
		
		if(options.rule)
		{
			lifeConfig.rule = options.rule;		
		}
		if(options.width)
		{
			lifeConfig.width = options.width;
		}
		if(options.height)
		{
			lifeConfig.height = options.height;
		}

		let life = new Life(lifeConfig);
		life.init();

		if(options.random)
		{
			life.fillRandom(options.random);
		}
		else
		{
			life.fillRandom(0.5);
		}

		for(let i = 0; i < (options.generations || 1); i++)
		{
			life.evolve();
		}

		let out = new Output(new TextOutput());
		out.emit(life);
	});

ludes
	.command("run")
	.option("-g --generations <generations to evolve to>", "# of Generations", parseInt)
	.option("--rule <rule>", "Life rule used")
	.option("-w --width <width>", "Width", parseInt)
	.option("-h --height <height>", "Height", parseInt)
	.option("-r --random <randomness>", "Initial randomness", parseFloat)
	.option("-m --speed <speed in milliseconds>", "Speed", parseFloat)
	.action((options)=>
	{
		let lifeConfig = new LifeConfiguration();
		
		if(options.rule)
		{
			lifeConfig.rule = options.rule;		
		}
		if(options.width)
		{
			lifeConfig.width = options.width;
		}
		if(options.height)
		{
			lifeConfig.height = options.height;
		}

		let life = new Life(lifeConfig);
		life.init();

		if(options.random)
		{
			life.fillRandom(options.random);
		}
		else
		{
			life.fillRandom(0.5);
		}

		let out = new Output(new TextOutput());
		setInterval(()=>{
			process.stdout.write('\n\033c');
			life.evolve();
			out.emit(life);
		}, (options.speed || 500));
	});

ludes.parse(process.argv);