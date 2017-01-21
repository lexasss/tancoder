'use strict';

// Imports

const css = require('./app.less');

const runner = require('./js/runner');
const dispatcher = require('./js/dispatcher');
const levels = require('./js/levels');
// const Level = require('./js/level');

const instruction = require('./components/instruction/instruction');
const code = require('./components/code/code');

const game = require('./js/game');


// Variables

const settings = {
    levelID: 0
};

if (window.location.hash.length > 1) {
    try {
        settings.levelID = Math.max( Math.min( +window.location.hash.substring(1) - 1, levels.length), 0 );
    }
    catch (ex) { }
}
else {
    settings = JSON.parse( localStorage.getItem( 'tancoder' ) ) || settings;
}


// Initialization

if (hljs) {
    hljs.initHighlightingOnLoad();
}

levels.forEach( level => {
    level.onStoneCreate = game.createStone;
    level.onBoxCreate = game.createBox;
    level.onTargetCreate = game.createTarget;
});

code.listen(
    dispatcher.parse,   // parse
    parsed => {         // run
        runner.run( parsed );
        game.startExecution();
    },
    () => {             // reset
        code.setExecLine( -1 );
        game.stopExecution( false );
        resetLevel();
    }
);

runner.init(
    (cmd, resolve) => { // execute
        if (cmd.isInternal) {
            executeInternalCommand( cmd );
            resolve();
        }
        else {
            game.execute( cmd, resolve );
        }
    },
    executionCompleted  // done
);


game.init( 'game' ).then( () => {
    createLevel( settings.levelID );
});


// Routines

function executeInternalCommand( cmd ) {
    if (cmd.name === 'executionLine' ) {
        code.setExecLine( cmd.execLine );
    }
}

function executionCompleted() {
    code.setExecLine( -1 );

    let isCompleted = game.isLevelCompleted();

    if (isCompleted) {
        game.showCongratulation().then( () => {
            code.reset();
            code.disable();

            moveToNextLevel();
        });
    }

    game.stopExecution( isCompleted );
}

function createLevel( id ) {
    const level = levels[ id ];
    game.newLevel();
    level.create();
    game.resetLevel( level.startState );
    instruction.update( level );
}

function resetLevel() {
    runner.stop();
    const level = levels[ settings.levelID ];
    game.resetLevel(
        level.startState,
        true        // resetKilled
    );
    level.reset();
}

function moveToNextLevel() {
    if (++settings.levelID < levels.length) {
        saveSettings();
        createLevel( settings.levelID );
        code.enable();
    }
    else {
        game.finish();
        //instruction.update( new Level( '', '', '', [] ) );
    }
}

function saveSettings() {
    localStorage.setItem( 'tancoder', JSON.stringify( settings ) );
}

// Exports

module.exports = {
    dispatcher: dispatcher.commands,
    code: code,
    setExecLine: function( line ) {
        dispatcher.addExecLine( line );
    }
};