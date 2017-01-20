'use strict';

const css = require('./code.less');
const enableEditorUtils = require('./editorUtils.js');

const root = document.querySelector( '#code' );
const editor = root.querySelector( 'textarea' );
const clear = root.querySelector( '.clear' );
const toggle = root.querySelector( '.toggle' );
const error = root.querySelector( '.error' );
const errorMsg = error.querySelector( '.error-msg' );

let isRunning = false;
let isDisabled = false;
let parse;
let run;
let stop;

let errorLine = -1;
let executionLine = -1;

let lineHeight = 25;
let textTopOffset = 8;

editor.addEventListener( 'focus', e => {
    error.classList.add( 'hidden' );
    editor.classList.remove( 'errorLine' );
    errorLine = -1;
});

editor.addEventListener( 'input', e => {
    updateButtons();
});

editor.addEventListener( 'scroll', e => {
    if (errorLine >= 0) {
        updateHighlightedLineLocation( errorLine );
    }
    else if (executionLine >= 0) {
        updateHighlightedLineLocation( executionLine );
    }
});

editor.addEventListener( 'keydown', e => {
    if (e.keyCode === 13 && e.ctrlKey) {
        editor.blur();
        toggle.click();
        e.preventDefault();
        return false;
    }
});

error.addEventListener( 'click', e => {
    error.classList.add( 'hidden' );
});

clear.addEventListener( 'click', e => {
    if (clear.classList.contains( 'disabled' )) {
        return;
    }

    if (window.confirm( 'Удалить весь код?' )) {
        editor.value = '';
    }
});

toggle.addEventListener( 'click', e => {
    let mustToggle = true;

    if (isRunning) {
        stop();
    }
    else {
        const result = parse( editor.value );
        mustToggle = result.length > 0;
        if (mustToggle) {
            run( result );
        }
    }

    if (mustToggle) {
        isRunning = !isRunning;
        updateButtons();
    }
});

function updateButtons() {
    if (editor.value !== '' && !isDisabled && !isRunning) {
        clear.classList.remove( 'disabled' );
    }
    else {
        clear.classList.add( 'disabled' );
    }

    if (editor.value === '' || isDisabled) {
        toggle.classList.add( 'disabled' );
    }
    else {
        toggle.classList.remove( 'disabled' );
    }

    toggle.textContent = isRunning ? 'Стоп' : 'Запуск';
}

function scrollToLine( line ) {
    line = Math.max( line - 1, 0 );
    const topOffset = line * 25;
    if (topOffset < editor.scrollTop || topOffset > editor.scrollTop + editor.clientHeight) {
        editor.scrollTop = topOffset;
    }
}

function translateError( errText ) {
    let result = errText.replace( 'is not defined', ' – что-то здесь не так..' );
    return result;
}

function updateHighlightedLineLocation( line ) {
    editor.style.backgroundPosition = 'left ' + (lineHeight * line + textTopOffset - editor.scrollTop) + 'px';
}

function calcLineHeight() {
    const textareaStyle = window.getComputedStyle( editor, null );
    let reNumber = /\d+\.?\d*/;
    let reResult;

    const lineHeightInPixels = textareaStyle.getPropertyValue( 'line-height' );
    reResult = reNumber.exec( lineHeightInPixels );
    lineHeight = +reResult[0];

    const paddingTopInPixels = textareaStyle.getPropertyValue( 'padding-top' );
    reResult = reNumber.exec( paddingTopInPixels );
    textTopOffset = +reResult[0];
}

enableEditorUtils( editor );
updateButtons();

module.exports = {
    listen: function( cbParse, cbRun, cbStop ) {
        parse = cbParse;
        run = cbRun;
        stop = cbStop;
    },

    // stop: function() {
    //     isRunning = false;
    //     updateButtons();
    // },

    reset: function() {
        editor.value = '';
        isRunning = false;
    },

    disable: function() {
        isDisabled = true;
        updateButtons();
    },

    enable: function() {
        isDisabled = false;
        updateButtons();
    },

    error: function( err ) {
        let msg = err.lineNumber !== undefined ? `Строчка #${err.lineNumber}: ` : '';
        errorMsg.textContent = msg + translateError( err.message );
        error.classList.remove( 'hidden' );

        if (err.lineNumber !== undefined) {
            errorLine = err.lineNumber - 1;
            scrollToLine( errorLine );

            calcLineHeight();

            editor.classList.add( 'errorLine' );
            updateHighlightedLineLocation( errorLine );
        }
    },

    setExecLine: function( line ) {
        if (executionLine < 0 && line >= 0) {
            editor.classList.add( 'executionLine' );
            calcLineHeight();
        }
        else if (executionLine >= 0 && line < 0) {
            editor.classList.remove( 'executionLine' );
        }

        executionLine = line;

        if (executionLine >= 0) {
            updateHighlightedLineLocation( executionLine );
        }
    }
};