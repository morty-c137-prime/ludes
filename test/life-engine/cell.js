#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

const expects = require('chai').expect;
const Cell    = require("../../lib/life-engine/cell");

const the = it;

describe("Cell", function() 
{

	describe("#constructor", function()
	{

		it("will throw a TypeError if passed X coordinate is not an integer", function()
		{
			expects(function() { return new Cell("a", 0); }).to.throw(TypeError);
		});

		it("will throw a TypeError if passed Y coordinate is not an integer", function()
		{
			expects(function() { return new Cell(0, "a"); }).to.throw(TypeError);
		});

	});

});