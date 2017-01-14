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
	}

	create( sprites, tileSize ) {
	    sprites.stones.removeAll( true );
	    sprites.boxes.removeAll( true );
	    sprites.targets.removeAll( true );

	    const rows = this.field.split( '\n' );
	    rows.forEach( (row, rowIndex) => {

	        const chars = row.split('');
	        chars.forEach( (cell, colIndex) => {

	            if (cell === 's') {
	                const stone = sprites.stones.create( colIndex * tileSize, rowIndex * tileSize, 'stone' );
	                stone.body.immovable = true;
	            }
	            else if (cell === 'b') {
	                const box = sprites.boxes.create( colIndex * tileSize, rowIndex * tileSize, 'box' );
	                box.body.immovable = true;
	            }
	            else if (cell === 't') {
	                const target = sprites.targets.create( colIndex * tileSize, rowIndex * tileSize, 'target' );
	            }
	            else if (cell === 'p') {
	            	this.startState.cell = { x: colIndex, y: rowIndex };
	            }
	        });
	    });
	}

	reset( sprites, tileSize ) {
	    sprites.boxes.removeAll( true );

	    const rows = this.field.split( '\n' );
	    rows.forEach( (row, rowIndex) => {

	        const chars = row.split('');
	        chars.forEach( (cell, colIndex) => {

	            if (cell === 'b') {
	                const box = sprites.boxes.create( colIndex * tileSize, rowIndex * tileSize, 'box' );
	                box.body.immovable = true;
	            }
	        });
	    });
	}
}

module.exports = Level;