#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

"use strict";

class Cell
{
	/**
	 * @param { Int } x 
	 * @param { Int } y
	 * @param { String } state The current state of the cell.
	 */
	constructor(xx, yy, state)
	{
		if(!Number.isInteger(xx) || !Number.isInteger(yy))
			throw new TypeError("x or y are not integers");

		this.x = xx;
		this.y = yy;

		this.state = state || 0;
	}

	/**
	 * @param { Int } newState
	 */
	set(newState)
	{
		this.state = newState;
	}

<<<<<<< HEAD
	/**
	 * Returns true if alive
	 */
	alive()
	{
		return this.state;
	}

	/**
	 * Returns true if dead
	 */
	dead()
	{
		return this.state == 0 ? 1 : 0;
	}
=======
	toString()
	{
		return "("+this.x + "," + this.y + " - " + this.state+")";
	}

>>>>>>> f96e9a95f0e5b9fabef2bae387dde0befc1b1888
}

module.exports = Cell;