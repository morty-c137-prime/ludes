#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

const expects              = require('chai').expect;
const Output               = require("../../lib/output/output.js");

const the = it;

describe("Output", function(){
	
	describe("#constructor", function()
	{
		it("should throw a TypeError if not passed a OutputStrategy", function(){
			expects(()=>{ new Output("fail"); }).to.throw(TypeError);
		});
	});

});