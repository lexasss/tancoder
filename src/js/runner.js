let commands;
let execute;
let done;
let isStopped = false;

function run( cmd ) {
    new Promise( function(resolve, reject) { 
    	execute( cmd, resolve );
    } ).then( next ).catch( err => {
        console.log( 'error', err );
    } );
}

function next() {
	if (isStopped) {
		return;
	}
    else if (commands.length > 0) {
        run( commands.shift() );
    }
    else {
    	done();
    }
}

module.exports = {
	init: function( cbExecute, cbDone ) {
		execute = cbExecute;
		done = cbDone;
	},

	run: function( cmds ) {
		commands = cmds;
		isStopped = false;
		next();
	},

	stop: function() {
		isStopped = true;
	}
};