'use strict';

class Level {
	constructor( name, field, instruction, availableCommands ) {
		this.name = name;
		this.field = field;
		this.instruction = instruction;
		this.availableCommands = availableCommands;

		this.startState = {
			cell: { x: 0, y: 0 },
			angle: 0
		};

		this.onStoneCreate = function( col, row ) { };
		this.onBoxCreate = function( col, row ) { };
		this.onTargetCreate = function( col, row ) { };
	}

	create() {
	    const rows = this.field.split( '\n' );
	    rows.forEach( (row, rowIndex) => {

	        const chars = row.split('');
	        chars.forEach( (cell, colIndex) => {

	            if (cell === 's') {
	            	this.onStoneCreate( colIndex, rowIndex );
	            }
	            else if (cell === 'b') {
	            	this.onBoxCreate( colIndex, rowIndex );
	            }
	            else if (cell === 't') {
	            	this.onTargetCreate( colIndex, rowIndex );
	            }
	            else if (cell === 'p') {
	            	this.startState.cell = { x: colIndex, y: rowIndex };
	            }
	        });
	    });
	}

	reset() {
	    const rows = this.field.split( '\n' );
	    rows.forEach( (row, rowIndex) => {

	        const chars = row.split('');
	        chars.forEach( (cell, colIndex) => {

	            if (cell === 'b') {
	            	this.onBoxCreate( colIndex, rowIndex );
	            }
	        });
	    });
	}
}

module.exports = Level;