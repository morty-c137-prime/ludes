#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

const expects              = require('chai').expect;
const Life                 = require("../../lib/life-engine/life");
const LifeConfiguration    = require("../../lib/life-engine/life-configuration");

const the = it;

describe("Life", function() 
{

	describe("#constructor", function()
	{

		it("will throw a TypeError if not passed a LifeConfiguration instance", function()
		{
			expects(function() { return new Life(); }).to.throw(TypeError);
		});

	});

	describe("#init", function()
	{
		let fakeConfig = new LifeConfiguration();
		fakeConfig.rule = "123/123";
		let fake = new Life(fakeConfig);
		fake.init();

		it("will build a board of size 8 by 8", function()
		{
			expects(fake.board.length).to.equal(fakeConfig.width);
			expects(fake.board[0].length).to.equal(fakeConfig.height);
		});

	});

	describe("#isBounded", function()
	{
		let fakeConfig = new LifeConfiguration();
		let fake = new Life(fakeConfig);

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

	describe("#getNeighbors", function()
	{
		let testBoard = [
			[new Cell(0, 0), new Cell(1, 0, 1), new Cell(2, 0)],
			[new Cell(0, 1, 1), new Cell(1, 1), new Cell(2, 1, 1)],
			[new Cell(0, 2), new Cell(1, 2), new Cell(2, 2)]
		];

		let fakeConfig = new LifeConfiguration();
		fakeConfig.width = 3;
		fakeConfig.height = 3;

		let fake = new Life(fakeConfig);

		fake.board = testBoard;

		it("will return three neighbors", function()
		{
			expects(fake.getNeighbors(1, 1)).is.equal(3);
		});
	});

});