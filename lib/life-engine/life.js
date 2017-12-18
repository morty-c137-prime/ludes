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

	/**
	 * Gets a single cell by x and y coordinate.
	 * @param { Int } x
	 * @param { Int } y
	 */
	getCell(x, y)
	{
		if(!Number.isInteger(x) || !Number.isInteger(y))
		{
			throw new TypeError("Passed a non-integer");
		}

		return this.board[x][y];
	}

	/**
	 * Gets the neighbors around ta point and returns them as an
	 * array
	 * @param { Int } x
	 * @param { Int } y
	 */
	getNeighbors(x, y)
	{
		let n = [];
		for(let xOff = -1; xOff < 2; xOff++)
		{
			for(let yOff = -1; yOff < 2; yOff++)
			{
				if(xOff == 0 && yOff == 0)
					continue;

				if(!this.isBounded(x + xOff, y + yOff))
					continue;

				n.push(this.getCell(x + xOff, y + yOff));
			}
		}
		return n;
	}

	/**
	 * Counts the alive cells in an array
	 * @param { Array } cells
	 */
	count(cells)
	{
		if(!cells instanceof Array)
			throw new TypeError("Not an array of cells");

		let count = 0; 
		cells.forEach((cell)=>
		{
			if(cell.state)
				count++;
		});		
		return count;
	}

	/**
	 * Iterate through single generation
	 */
	iterate()
	{
		// Create a reference board
		let reference = this.board.slice(0);

		reference.forEach((column)=>{
			column.forEach((cell)=>{
				let neighbors = this.getNeighbors(cell.x, cell.y);
				let count = this.count(neighbors);
			});
		});

		// append the changed board...
		this.board = reference;
	}
}

module.exports = Life;