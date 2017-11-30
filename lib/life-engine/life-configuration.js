#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

"use strict";

/**
 * A configuration of a Life board.
 */
class LifeConfiguration
{
	constructor()
	{	
		/**
		 * Height and Width
		 * @type {Number}
		 */
		let width = 16;
		let height = 16;

		Object.defineProperty(this, 'width', {
			get() { return width; },
			set(value) { width = value; } 
		});

		Object.defineProperty(this, 'height', {
			get() { return height; },
			set(value) { height = value; } 
		});

		/**
		 * The rule for this universe. (B/S)
		 * @type {String}
		 */
		let rule = '3/23';

		Object.defineProperty(this, 'rule', {
			get() { return rule; },
			set(value) { rule = this.makeRule(value); } 
		});

		// TODO: soups
	}

	/**
	 * Takes a rule string and checks if it is in the #/# format.
	 * If it is in B#/S# then change it to, #/#.
	 * @param { String } rule 
	 */
	makeRule(rule)
	{
		if(!(typeof rule === "string"))
			throw new TypeError("The rule supplied is not a string.");

		let numbers = /(\d+)/.exec(rule);
		if (numbers.length === 0)
			throw new TypeError("Did not supply any integers when making a rule...");

		return numbers[0].toString() + "/" + numbers[1].toString();
	}

}

module.exports = LifeConfiguration;