// 

class KeyboardEmulator {
    static emulateKeyEvent (key, eventName) {
        var keyboardEvent = document.createEvent('KeyboardEvent');
        var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

        keyboardEvent[initMethod](
            eventName, // event type : keydown, keyup, keypress
            true, // bubbles
            true, // cancelable
            window, // viewArg: should be window
            false, // ctrlKeyArg
            false, // altKeyArg
            false, // shiftKeyArg
            false, // metaKeyArg
            key, // keyCodeArg : unsigned long the virtual key code, else 0
            0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
        );
        document.dispatchEvent(keyboardEvent);
    }

    static pressKey (key, duration, cb) {
        setTimeout(() => {
            KeyboardEmulator.emulateKeyEvent( key, 'keydown' );
        }, 0 );
        setTimeout(() => {
            KeyboardEmulator.emulateKeyEvent( key, 'keyup' );
            if (cb) {
                cb();
            }
        }, duration || 500 );
    }
}

module.exports = KeyboardEmulator;