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
class FileOutput extends OutputStrategy
{
	constructor(path)
	{

		super();
		
		/**
		 * Path to write new files to.
		 * @type {String}
		 */
		this.path = path || "./";

		/**
		 * Base name for files
		 * @type {String}
		 */
		this.name = "Life";

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
	 * Creates a name with time stamp.
	 */
	createName(testDate)
	{
		let d = testDate || new Date();
		return `${this.name}-${d.getHours()}:${d.getMinutes()}.txt`; 
	}

	/**
	 * Emits life out to a file
	 * @param {Life} life
	 */
	emit(life)
	{
	 
	}
}

module.exports = FileOutput;