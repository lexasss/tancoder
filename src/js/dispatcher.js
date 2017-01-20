'use strict';

const Command = require( './command' );

const GAME_SPEED = 2;
const DURATION = 1000 / GAME_SPEED; // ms
const VELOCITY = 48 * GAME_SPEED; // px/s
const ANGULAR_VELOCITY = 100 * GAME_SPEED; // deg/s

const commands = {
    forward: function( count = 1 ) {
        for (let i = 0; i < count; i++) {
            cmdList.push( new Command( 'forward', { velocity: VELOCITY, duration: DURATION } ) );
        }
    },
    backward: function( count = 1 ) {
        for (let i = 0; i < count; i++) {
            cmdList.push( new Command( 'backward', { velocity: -VELOCITY, duration: DURATION } ) );
        }
    },
    left: function( count = 1 ) {
        for (let i = 0; i < count; i++) {
            cmdList.push( new Command( 'left', { angularVelocity: -ANGULAR_VELOCITY, duration: DURATION } ) );
        }
    },
    right: function( count = 1 ) {
        for (let i = 0; i < count; i++) {
            cmdList.push( new Command( 'right', { angularVelocity: ANGULAR_VELOCITY, duration: DURATION } ) );
        }
    },
    fire: function( count = 1 ) {
        for (let i = 0; i < count; i++) {
            cmdList.push( new Command( 'fire', { duration: DURATION } ) );
        }
    },
};

const COMMANDS = Object.keys( commands );
const INSTRUCTION = [
    { re: `\\bloop\\s*\\((\\d*)\\)\\s*{`, to: 'for( let i = 0; i < $1; i++) {' }
];
const cmdList = [];

let lineNumber;

function lineNumberGenerator( match, p1 ) {
    return `Tancoder.setExecLine( ${lineNumber++} ); ${p1}`;
}

function insertLineNumbers( text ) {
    lineNumber = 0;
    return text.replace( /^(.*\S+.*)/gm, lineNumberGenerator );
}

module.exports = {
    parse: function( text ) {
        cmdList.length = 0;

        COMMANDS.forEach( cmd => {
            const re = new RegExp( `\\b${cmd}\\(`, 'gm' );
            text = text.replace( re, `Tancoder.dispatcher.${cmd}(` );
        });

        INSTRUCTION.forEach( instruction => {
            const re = new RegExp( instruction.re, 'gm' );
            text = text.replace( re, instruction.to );
        });

        text = insertLineNumbers( text );

        text = '\
            let ok = true;\
            try {' +
                text +
            '}\
            catch (err) {\
                Tancoder.code.error( err );\
                ok = false;\
            }\
            ok;';

        try {
            const ok = eval( text );
            if (!ok) {
                cmdList.length = 0;
            }
        }
        catch (err) {
            Tancoder.code.error( err );
            cmdList.length = 0;
        }

        return cmdList;
    },

    addExecLine: function( line ) {
        cmdList.push( new Command( 'executionLine', { execLine: line, isInternal: true } ) );
    },

    commands: commands
};