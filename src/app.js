// Imports

const css = require('./app.less');

const runner = require('./js/runner');
const dispatcher = require('./js/dispatcher');
const levels = require('./js/levels');
const level = require('./js/level');

const instruction = require('./components/instruction/instruction');
const code = require('./components/code/code');

const game = require('./js/game');


// Variables

let levelID = 0;


// Initialization

hljs.initHighlightingOnLoad();

code.listen( dispatcher.parse, runner.run, resetLevel );

runner.init( game.execute, executionCompleted );

game.init( 'game' ).then( () => {
    createLevel( levelID );
})


// Routines

function executionCompleted() {
    if (game.isLevelCompleted()) {
        game.showCongratulation().then( () => {
            code.reset();
            code.disable();

            if (++levelID < levels.length) {
                createLevel( levelID );
                code.enable();
            }
            else {
                game.finish();
                instruction.update( new Level( '', '', '', [] ) );
            }
        });
    }
}

function createLevel( id ) {
    const level = levels[ id ];
    level.create( game.sprites(), game.tileSize );
    game.resetLevel( level.startState );
    instruction.update( level );
}

function resetLevel() {
    runner.stop();
    const level = levels[ levelID ];
    level.reset( game.sprites(), game.tileSize );
    game.resetLevel( level.startState );
}

// Exports

module.exports = {
    dispatcher: dispatcher.commands,
    code: code
}