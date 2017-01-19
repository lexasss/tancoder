'use strict';

const css = require('./instruction.less');

const root = document.querySelector( '#instruction' );
const title = root.querySelector( '.title' );
const text = root.querySelector( '.text' );
const commandList = root.querySelector( '.command-list' );

module.exports = {
    update: function( level ) {
        title.textContent = level.name;
        text.innerHTML = level.instruction;

        commandList.innerHTML = '';
        level.availableCommands.forEach( cmd => {
        	const item = document.createElement( 'div' );
        	item.classList.add( 'command' );
            item.innerHTML = `<span class="inline-code">${cmd.name}</span> - ${cmd.description}`;
            commandList.appendChild( item );
        });

		setTimeout( function() {
			const codeSnippets = text.querySelectorAll( 'pre code' );
			for (let i = 0; i < codeSnippets.length; i++) {
			    hljs.highlightBlock( codeSnippets[i] );
			}
		}, 0);
    }
};