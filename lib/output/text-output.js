#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
 */

"use strict";

let OutputStrategy = require("./output-strategy");
var colors = require('colors');

/**
 * Outputs to console.
 */
class TextOutput extends OutputStrategy
{
	constructor(path)
	{

		super();

		/**
		 * Alive character
		 */
		this.alive = "▓";

		/**
		 * Dead character
		 */
		this.dead = ".";

	}

	/**
	 * Emits life out to console.
	 * @param {Life} life
	 */
	emit(life)
	{
		for(let y = 0; y < life.config.height; y++)
		{
			for(let x = 0; x < life.config.width; x++)
			{
				if(life.get(x, y).state)
					process.stdout.write(this.alive.green);
				else
					process.stdout.write(this.dead.white);
			}
			process.stdout.write('\n');
		}
		process.stdout.write("Generations: " + life.generations);
		process.stdout.write("\nLiving Cells: " + life.count());
		let dead = ((life.config.width * life.config.height) - life.count()).toString();
		process.stdout.write("\nDead Cells: " + dead);
	}
}

module.exports = TextOutput;

