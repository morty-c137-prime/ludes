#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

"use strict";

const LifeConfiguration = require("./life-configuration");
const Cell              = require("./cell");

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

		/**
		 * Number of generations
		 * @type {Number}
		 */
		this.generations = 0;
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
	 * Returns an empty board
	 */
	empty()
	{
		let e = [];
		for(let x = 0; x < this.config.width; x++)
		{
			e.push([]);
			for(let y = 0; y < this.config.height; y++)
			{
				e[x].push(new Cell(x, y));
			}
		}
		return e;
	}

	/**
	 * Fills the board randomly
	 * @param {float} distribution Chance of state being changed. Between 0 - 1
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
	 * @param {Number} x
	 * @param {Number} y
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
	 * Returns state of single cell on board.
	 * @param {Number} x
	 * @param {Number} y
	 */
	get(x, y)
	{
		if(!Number.isInteger(x) || !Number.isInteger(y))
		{
			throw new TypeError("Passed a non-integer");
		}
		return this.board[x][y];
	}

	/**
	 * Sets state of single cell on board.
	 * @param {Number} x
	 * @param {Number} y
	 */
	set(x, y, state)
 	{
		if(!Number.isInteger(x) || !Number.isInteger(y))
		{
			throw new TypeError("Passed a non-integer");
		}

		if(this.isBounded(x, y))
			return this.board[x][y].state = state;
		else
			throw new TypeError("Passed a pair outside bounds");
	}

	/**
	 * Gets neighbors of state (default alive)
	 * @param {Number} x
	 * @param {Number} y
	 */
	getNeighbors(x, y)
	{
		if(!Number.isInteger(x) || !Number.isInteger(y))
		{
			throw new TypeError("Passed a non-integer");
		}

		let n = [];
		for(let i = -1; i <= 1; i++)
		{
			for(let j = -1; j <= 1; j++)
			{
				if(i == 0 && j == 0)
				{
					continue;
				}

				if(this.isBounded(x + i, y + j))
				{
					n.push(this.board[x+i][y+j]);
				}
				else
				{
					n.push(new Cell(x + i, y + j, 0));
				}
			}
		}
		return n;
	}

	/**
	 * Returns number of living numbers
	 * @param { Array } n Array of cells
	 */
	count(n)
	{
		let count = 0;
		n.forEach((cell)=>
		{
			if(cell.state)
				count++;
		});
		return count;
	}

	/**
	 * Evolves a single generation
	 */
	evolve()
	{
		// Create a buffer for writing
		let buffer = this.empty();

		let ruleset = this.config.rule.split("/");
		let birth = ruleset[0];
		let survive = ruleset[1];

		this.board.forEach((column)=>{
			column.forEach((cell)=>{
				let neighbors  = this.getNeighbors(cell.x, cell.y);
				let numOfAliveNeighbors = this.count(neighbors).toString();

				if(cell.state)
				{
					if(!survive.includes(numOfAliveNeighbors))
						buffer[cell.x][cell.y].set(0);
					else
						buffer[cell.x][cell.y].set(1);
				}
				else
				{
					if(birth.includes(numOfAliveNeighbors))
						buffer[cell.x][cell.y].set(1);
				}
			});
		});
		
		this.generations++;
		this.board = buffer;
	}
}