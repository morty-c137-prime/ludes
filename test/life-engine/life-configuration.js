#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
*/

const expects           = require('chai').expect;
const LifeConfiguration = require("../../lib/life-engine/life-configuration");

const the = it;

describe("LifeConfiguration", function()
{
	let fake = new LifeConfiguration();
	
	describe("#defaults", function()
	{
		
		it("will return default width 16", function()
		{
			expects(fake.width).to.equal(16);
		});

		it("will return default height 16", function()
		{
			expects(fake.height).to.equal(16);
		});

		it("will return default rule '3/23'", function()
		{
			expects(fake.rule).to.equal("3/23");
		});

	});

	describe("#makeRule", function(){

		it("will throw a TypeError if rule is not a string", function()
		{
			expects(function() { fake.rule = 12.2; }).to.throw(TypeError);
		});

		it("will throw a TypeError if rule contains no integers", function()
		{
			expects(function() {fake.rule = "ABCD"; }).to.throw(TypeError);
		});

		it("will be equal to '3/23'", function(){
			expects(((fake)=>{fake.rule = "B3/S23"; return fake.rule; })(fake))
					.to.equal("3/23");
		});

	});

});