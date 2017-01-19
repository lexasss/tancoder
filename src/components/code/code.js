const css = require('./code.less');

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

editor.addEventListener( 'focus', e => {
    error.classList.add( 'hidden' );
    editor.classList.remove( 'errorLine' );
    errorLine = -1
});

editor.addEventListener( 'input', e => {
    updateButtons();
});

editor.addEventListener( 'scroll', e => {
    if (editor.classList.contains( 'errorLine' )) {
        editor.style.backgroundPosition = 'left ' + (25 * (errorLine + 0.3) - editor.scrollTop) + 'px';
    }
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
        errorMsg.textContent = msg + err.message;
        //error.classList.remove( 'hidden' );

        if (err.lineNumber !== undefined) {
            errorLine = err.lineNumber - 1;
            scrollToLine( errorLine );

            editor.classList.add( 'errorLine' );
            editor.style.backgroundPosition = 'left ' + (25 * (errorLine + 0.2) - editor.scrollTop) + 'px';

            //errorLine.style.top = editor.offsetTop - editor.scrollTop + 25 * (err.lineNumber - 0.7) + 'px';
        }
    }
};