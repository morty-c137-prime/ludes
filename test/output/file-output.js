#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
 */

const expects              = require('chai').expect;
const Output               = require("../../lib/output/output.js");
const FileOutput           = require("../../lib/output/file-output.js");

const the = it;

describe("FileOutput", function(){		
	
	let fileOutput;

	before(()=>{
		fileOutput = new FileOutput();
	});

	describe("#constructor", function()
	{
		it("should have property `path`", function(){
			expects(fileOutput).to.have.property('path');
		});

		it("should have property `name`", function(){
			expects(fileOutput).to.have.property('name');
		});

		it("should have property `alive`", function(){
			expects(fileOutput).to.have.property('alive');
		});

		it("should have property `dead`", function(){
			expects(fileOutput).to.have.property('dead');
		});
	});
	
});