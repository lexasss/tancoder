'use strict';

class Command {
	constructor( name, params ) {
		this.name = name;
		this.velocity = params.velocity;
		this.angularVelocity = params.angularVelocity;
		this.duration = params.duration;
	}
}

module.exports = Command;