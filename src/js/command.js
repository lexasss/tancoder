'use strict';

class Command {
	constructor( name, params ) {
		this.name = name;
		this.velocity = params.velocity;
		this.angularVelocity = params.angularVelocity;
		this.duration = params.duration;
		this.execLine = params.execLine;
		this.isInternal = !!params.isInternal;
	}
}

module.exports = Command;