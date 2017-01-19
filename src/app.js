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

let levelID = 0;
if (window.location.hash.length > 1) {
    try {
        levelID = Math.max( Math.min( +window.location.hash.substring(1) - 1, levels.length), 0 );
    }
    catch (ex) { }
}
else {
    const settings = JSON.parse( localStorage.getItem( 'tancoder' ) );
    if (settings) {
        levelID = settings.levelID || levelID;
    }
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
        game.stopExecution( false );
        resetLevel();
    }
);

runner.init(
    game.execute,       // execute
    executionCompleted  // done
);


game.init( 'game' ).then( () => {
    createLevel( levelID );
});


// Routines

function executionCompleted() {
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
    const level = levels[ levelID ];
    game.resetLevel(
        level.startState,
        true        // resetKilled
    );
    level.reset();
}

function moveToNextLevel() {
    if (++levelID < levels.length) {
        saveSettings();
        createLevel( levelID );
        code.enable();
    }
    else {
        game.finish();
        //instruction.update( new Level( '', '', '', [] ) );
    }
}

function saveSettings() {
    const settings = {
        levelID: levelID
    };

    localStorage.setItem( 'tancoder', JSON.stringify( settings ) );
}

// Exports

module.exports = {
    dispatcher: dispatcher.commands,
    code: code
};