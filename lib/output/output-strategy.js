#!/usr/bin/nodejs

/*
 * @author Richard Alvarez
 */

"use strict";

/**
 * Output class allows for CA boards to be outputted to different formats.
 */
class OutputStrategy
{
	emit(life)
	{
		throw new ReferenceError('not implemented in superclass');
	}
}

module.exports = OutputStrategy;