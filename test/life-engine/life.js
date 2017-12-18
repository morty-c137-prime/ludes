#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

const expects              = require('chai').expect;
const Life                 = require("../../lib/life-engine/life");
const LifeConfiguration    = require("../../lib/life-engine/life-configuration");
const Cell                 = require("../../lib/life-engine/cell");

const the = it;

describe("Life", function() 
{
	let testBoard, fakeConfig, fake, neighbors;

	beforeEach(() =>
	{
		testBoard = [
			[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
			[new Cell(1, 0, 1), new Cell(1, 1, 1), new Cell(1, 2, 1)],
			[new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
		];

		fakeConfig = new LifeConfiguration();
		fakeConfig.width = 3;
		fakeConfig.height = 3;
		fakeConfig.rule = "3/23";

		fake = new Life(fakeConfig);

		fake.board = testBoard;

		neighbors = fake.getNeighbors(0, 0);
	});

	describe("#constructor", function()
	{
		it("will throw a TypeError if not passed a LifeConfiguration instance", function()
		{
			expects(function() { return new Life(); }).to.throw(TypeError);
		});

	});

	describe("#init", function()
	{
		it("will build a board of size 3 by 3", function()
		{
			fake.board = [];
			fake.init();
			expects(fake.board.length).to.equal(fakeConfig.width);
			expects(fake.board[0].length).to.equal(fakeConfig.height);
		});

	});

	describe("#isBounded", function()
	{
		it("will throw a TypeError if not passed two integers", function() 
		{
			expects(function() { fake.isBounded('q', 'z'); }).to.throw(TypeError);
		});

		it("will return false if x is less than zero", function() 
		{
			expects(fake.isBounded(-1, 0)).is.equal(false);
		});

		it("will return false if x is greater than width", function() 
		{
			expects(fake.isBounded(fake.config.width, 0)).is.equal(false);
		});

		it("will return false if y is less than zero", function() 
		{
			expects(fake.isBounded(0, -1)).is.equal(false);
		});

		it("will return false if y is greater than height", function() 
		{
			expects(fake.isBounded(0, fake.config.height)).is.equal(false);
		});

		it("will return true if is in bounds", function()
		{
			expects(fake.isBounded(0, 0)).is.equal(true);
		});

	});

	describe("#getCell", function()
	{	
		let fakeConfig = new LifeConfiguration();
		let fake = new Life(fakeConfig);

		it("will throw a TypeError if not passed two integers", function() 
		{
			expects(function() { fake.getCell('q', 'z'); }).to.throw(TypeError);
		});

		it("will return an empty cell at x and y (\"null cell\") if, x and y are out of bounds", function() 
		{
			expects(fake.getCell(-1, -1).x).is.equal(-1);
			expects(fake.getCell(-1, -1).y).is.equal(-1);
			expects(fake.getCell(-1, -1).state).is.equal(0);
		});
	});

	describe("#getNeighbors", function()
	{
		it("will return neighbors", function()
		{
			expects(neighbors.length).is.equal(8);
		});

	});

	describe("#count", function()
	{
		it("will count two living neighbors", function()
		{
			expects(fake.count(fake.getNeighbors(1, 1))).is.equal(2);
		});

	});

	describe("#get", function()
	{
		it("will return true from 1, 0", function(){
			expects(fake.get(1, 0).state).to.equal(1);
		});
		it("will return false from 0, 0", function(){
			expects(fake.get(0, 0).state).to.equal(0);
		});

	});

	describe("#set", function()
	{
		it("will change to dead at 1, 1", function(){
			fake.set(1, 1, 0);
			expects(fake.get(1, 1).state).to.equal(0);
			fake.set(1, 1, 1);
		});

	});

	describe("#evolve", function(){
		
		before(()=>{
			fake.evolve();
		});

		it("will properly evolve a period one oscillator in B3/S23", function()
		{
			expects(fake.get(1, 0).state).is.equal(1);
			expects(fake.get(1, 1).state).is.equal(1);
			expects(fake.get(1, 2).state).is.equal(1);
		});
	});

});