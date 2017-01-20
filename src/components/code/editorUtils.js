/*
    Here go credits to unknown author for tab insertion functionality
    It used with some modifications.
*/
'use strict';

const TAB = '  ';

function getCurrentLineIndent( textarea ) {
    let indentSize = 0;
    let caretPos = textarea.getCaretPosition();
    while (caretPos >= 0 && textarea.value.charAt( caretPos ) !== '\n' ) {
        if (textarea.value.charAt( caretPos ) === ' ') {
            indentSize += 1;
        }
        else {
            indentSize = 0;
        }
        caretPos -= 1;
    }

    return indentSize ? new Array( indentSize + 1 ).join( ' ' ) : '';
}

function getCurlyBracketIndent( textarea ) {
    let caretPos = textarea.getCaretPosition();
    return caretPos > 0 && textarea.value.charAt( caretPos - 1 ) === '{' ? TAB : '';
}

module.exports = function( textarea ) {

    HTMLTextAreaElement.prototype.getCaretPosition = function () { //return the caret position of the textarea
        return this.selectionStart;
    };

    HTMLTextAreaElement.prototype.setCaretPosition = function( position ) { //change the caret position of the textarea
        this.selectionStart = position;
        this.selectionEnd = position;
        this.focus();
    };

    textarea.addEventListener( 'keydown', event => {
        // basic tab support
        if (event.keyCode === 9) { //tab was pressed
            const newCaretPosition = textarea.getCaretPosition() + TAB.length;
            textarea.value = textarea.value.substring( 0, textarea.getCaretPosition() ) + TAB +
                    textarea.value.substring( textarea.getCaretPosition(), textarea.value.length );
            textarea.setCaretPosition( newCaretPosition );
            event.preventDefault();
            return false;
        }
        if (event.keyCode === 8) { //backspace
            if (textarea.value.substring( textarea.getCaretPosition() - TAB.length, textarea.getCaretPosition() ) === TAB) { //it's a tab space
                const newCaretPosition = textarea.getCaretPosition() - (TAB.length - 1);
                textarea.value = textarea.value.substring( 0, textarea.getCaretPosition() - (TAB.length - 1) ) +
                        textarea.value.substring( textarea.getCaretPosition(), textarea.value.length );
                textarea.setCaretPosition( newCaretPosition );
            }
        }
        if (event.keyCode === 37) { //left arrow
            if (textarea.value.substring( textarea.getCaretPosition() - TAB.length, textarea.getCaretPosition() ) === TAB) { //it's a tab space
                const newCaretPosition = textarea.getCaretPosition() - (TAB.length - 1);
                textarea.setCaretPosition( newCaretPosition );
            }
        }
        if (event.keyCode === 39) { //right arrow
            if (textarea.value.substring( textarea.getCaretPosition() + TAB.length, textarea.getCaretPosition() ) === TAB) { //it's a tab space
                const newCaretPosition = textarea.getCaretPosition() + (TAB.length - 1);
                textarea.setCaretPosition( newCaretPosition );
            }
        }

        // advanced tab support
        if (event.keyCode === 13 && !event.ctrlKey) { //enter was pressed
            let indent = getCurrentLineIndent( textarea );
            indent += getCurlyBracketIndent( textarea );

            if (indent.length > 0) {
                const newCaretPosition = textarea.getCaretPosition() + '\n'.length + indent.length;
                textarea.value = textarea.value.substring( 0, textarea.getCaretPosition() ) + '\n' + indent +
                        textarea.value.substring( textarea.getCaretPosition(), textarea.value.length );
                textarea.setCaretPosition( newCaretPosition );
                event.preventDefault();
                return false;
            }
        }
    });

    textarea.addEventListener( 'keypress', event => {
        if (event.keyCode === 13 && event.ctrlKey) { //enter was pressed
            event.preventDefault();
            return false;
        }
        if (event.key === '}') {
            let indent = getCurrentLineIndent( textarea );
            if (indent.length >= TAB.length) {
                const newCaretPosition = textarea.getCaretPosition() - TAB.length;
                textarea.value = textarea.value.substring( 0, textarea.getCaretPosition() - TAB.length ) +
                        textarea.value.substring( textarea.getCaretPosition(), textarea.value.length );
                textarea.setCaretPosition( newCaretPosition );
            }
        }
    });
};
