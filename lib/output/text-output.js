#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
 */

"use strict";

let fs     = require("fs");
let OutputStrategy = require("./output-strategy");

/**
 * Output class allows for CA boards to be outputted to different formats.
 */
class TextOutput extends OutputStrategy
{
	constructor(path)
	{

		super();

		/**
		 * Alive character
		 */
		this.alive = "#";

		/**
		 * Dead character
		 */
		this.dead = ".";

	}


	/**
	 * Emits life out to a file
	 * @param {Life} life
	 */
	emit(life)
	{
		for(let x = 0; x < life.config.width; x++)
		{
			for(let y = 0; y < life.config.height; y++)
			{
				if(life.get(x, y).state)
					process.stdout.write(this.alive);
				else
					process.stdout.write(this.dead);
			}
			process.stdout.write('\n');
		}
	}
}

module.exports = TextOutput;