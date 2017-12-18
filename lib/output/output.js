#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
 */

"use strict";

let OutputStrategy = require("./output-strategy");

class Output
{
	constructor(outputStrategy)
	{
		if(outputStrategy instanceof OutputStrategy)
			this.outputStrategy = outputStrategy;
		else
			throw new TypeError("Not passed proper OutputStrategy...");
	}

	emit(life)
	{
		this.outputStrategy.emit(life);
	}
}

module.exports = Output;