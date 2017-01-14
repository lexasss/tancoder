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

editor.addEventListener( 'focus', e => {
    error.classList.add( 'hidden' );
});

editor.addEventListener( 'input', e => {
    updateButtons();
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
        error.classList.remove( 'hidden' );
    }
};