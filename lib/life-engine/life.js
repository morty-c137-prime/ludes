#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

"use strict";

const LifeConfiguration = require("./life-configuration");
const Cell              = require("./cell")

/**
 *  Symbolic of *one* universe (board) running the game of life. 
 *  This holds cells data, and functions to work with the grid.
 */
class Life
{
	/**
	 * Creates one single instance of Life.
	 *
	 * @param {LifeConfiguration} config A universe configuration (rule, width, height, soups, etc.). 
	 */
	constructor(config)
	{
		if(!(config instanceof LifeConfiguration))
		{
			throw new TypeError("Failed to supply an instance of LifeConfiguration...");
		}	

		this.config = config;

		/**
		 * The board property
		 * @type {Array}
		 */
		this.board = [];
	}

	/**
	 * Builds the board with proper width and height and loads soups. 
	 */
	init()
	{	
		for(let x = 0; x < this.config.width; x++)
		{
			this.board.push([]);
			for(let y = 0; y < this.config.height; y++)
			{
				this.board[x].push(new Cell(x, y));
			}
		}
		// TODO: soups
	}

	/**
	 * Fills the board randomly
	 * @param { float } distribution Chance of state being changed. Between 0 - 1
	 */
	fillRandom(distribution)
	{
		this.board.forEach((column) => 
		{
			column.forEach((cell) => 
			{
				if(Math.random() > distribution)
					cell.set(1);
				else
					cell.set(0);
			});
		});
	}

	/**
	 * Is within the bounds of our universe.
	 * @param { Int } x
	 * @param { Int } y
	 */
	isBounded(x, y)
	{
		if(!Number.isInteger(x) || !Number.isInteger(y))
		{
			throw new TypeError("Passed a non-integer");
		}

		return x >= 0 && y >= 0 && x < this.config.width && y < this.config.height;
	}



}

module.exports = Life;