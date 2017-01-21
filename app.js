var Tancoder =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Imports

	const css = __webpack_require__(2);

	const runner = __webpack_require__(7);
	const dispatcher = __webpack_require__(8);
	const levels = __webpack_require__(10);
	// const Level = require('./js/level');

	const instruction = __webpack_require__(12);
	const code = __webpack_require__(15);

	const game = __webpack_require__(19);


	// Variables

	let settings = {
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

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./app.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./app.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "html {\n  font-size: 16px;\n}\nbody {\n  font-size: 1em;\n  margin: 0;\n  padding: 0;\n}\nh3 {\n  font-size: 1.3em;\n}\n.logo-container {\n  content: ' ';\n  width: 100%;\n  height: 64px;\n  background: -webkit-linear-gradient(#8C4A07, #5b3005);\n  background: linear-gradient(#8C4A07, #5b3005);\n}\n.logo-container .logo {\n  height: 100%;\n  text-align: center;\n  background: url(" + __webpack_require__(5) + ") no-repeat center center;\n}\n@media (max-height: 700px) {\n  .logo-container {\n    height: 48px;\n  }\n}\n@media (max-height: 500px) {\n  .logo-container {\n    height: 40px;\n  }\n}\n.top-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.top-container #game {\n  display: inline-block;\n}\n.top-container #code-container {\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: top;\n  height: calc(100vh - 70px);\n  min-width: 17em;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n}\n.top-container #instruction-container {\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: top;\n  padding-right: 0.5em;\n  max-height: calc(100vh - 70px);\n  max-width: 50em;\n  overflow-y: scroll;\n}\n@media (max-width: 1900px) {\n  .top-container #game canvas {\n    width: calc(864px) !important;\n    height: calc(768px) !important;\n  }\n}\n@media (max-width: 1700px) {\n  .top-container {\n    font-size: 0.9375em;\n  }\n  .top-container #game canvas {\n    width: calc(720px) !important;\n    height: calc(640px) !important;\n  }\n}\n@media (max-width: 1300px) {\n  .top-container {\n    font-size: 0.875em;\n  }\n  .top-container #game canvas {\n    width: calc(576px) !important;\n    height: calc(512px) !important;\n  }\n}\n@media (max-width: 1100px) {\n  .top-container {\n    font-size: 0.8125em;\n  }\n  .top-container #game canvas {\n    width: calc(504px) !important;\n    height: calc(448px) !important;\n  }\n}\n@media (max-width: 1000px) {\n  .top-container {\n    font-size: 0.75em;\n  }\n  .top-container #game canvas {\n    width: calc(432px) !important;\n    height: calc(384px) !important;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/logo.png";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	let commands;
	let execute;
	let done;
	let isStopped = false;

	function run( cmd ) {
	    new Promise( function(resolve, reject) {
	    	execute( cmd, resolve );
	    } ).then( next ).catch( err => {
	        console.log( 'error', err );
	    } );
	}

	function next() {
		if (isStopped) {
			return;
		}
	    else if (commands.length > 0) {
	        run( commands.shift() );
	    }
	    else {
	    	done();
	    }
	}

	module.exports = {
		init: function( cbExecute, cbDone ) {
			execute = cbExecute;
			done = cbDone;
		},

		run: function( cmds ) {
			commands = cmds;
			isStopped = false;
			next();
		},

		stop: function() {
			isStopped = true;
		}
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Command = __webpack_require__( 9 );

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

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	class Command {
		constructor( name, params ) {
			this.name = name;
			this.velocity = params.velocity;
			this.angularVelocity = params.angularVelocity;
			this.duration = params.duration;
			this.execLine = params.execLine;
			this.isInternal = !!params.isInternal;
		}
	}

	module.exports = Command;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Level = __webpack_require__( 11 );

	module.exports = [
	    new Level(
	        'Уровень #1: основы',

	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '       bbbbb      ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '         t        ' + '\n' +
	        '                  ' + '\n' +
	        '         p        ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ',

	        '<p>Напиши программу которая заведёт танк на клетку с кружком.\
	        В программе используй команду <span class="inline-code">forward</span>\
	        которая передвигает танк вперёд на одну клетку.\
	        После команды поставь скобки <span class="inline-code">()</span>\
	        и точку с запятой <span class="inline-code">;</span>.\
	        <p>Например:\
	            <pre><code class="js">' +
	                'forward();\n'+
	            '</code></pre>\
	        <p>Написав программу, нажми кнопку <span class="inline-code">Запуск</span>.',

	        [
	            { name: 'forward()', description: 'ехать вперёд' },
	        ]
	    ),

	    new Level(
	        'Уровень #2: повороты',

	        'bbbbbbbbbbbbbbbbbb' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '       p          ' + '\n' +
	        '         t        ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        'bbbbbbbbbbbbbbbbbb',

	        '<p>Для поворота танка налево и направо используй команды\
	        <span class="inline-code">left</span> и <span class="inline-code">right</span>.\
	        <p>Обрати внимание, что ниже есть справочник, где перечислены все команды которые\
	        можно использовать.',

	        [
	            { name: 'forward()', description: 'ехать вперёд' },
	            { name: 'left()', description: 'повернуть налево' },
	            { name: 'right()', description: 'повернуть направо' },
	        ]
	    ),

	    new Level(
	        'Уровень #3: зачем нужны скобки?',

	        'bbbb          bbbb' + '\n' +
	        'b                b' + '\n' +
	        'b p              b' + '\n' +
	        'b                b' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '        bb        ' + '\n' +
	        '        bb        ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        'b                b' + '\n' +
	        'b              t b' + '\n' +
	        'b                b' + '\n' +
	        'bbbb          bbbb',

	        '<p>Ты помнишь что после каждой команды ставятся скобки? Это неспроста!\
	        Между скобками можно записать число.\
	        Например, вот так: <span class="inline-code">left(2)</span>.\
	        Число <span class="inline-code">2</span> как бы говорит команде:\
	        сделай поворот два раза, а не один, как было на прошлых уровнях.\
	        То есть, вместо вот такого:\
	            <pre><code class="js">' +
	                'left();\n'+
	                'left();\n'+
	            '</code></pre>\
	        можно написать так:\
	            <pre><code class="js">' +
	                'left(2);\n'+
	            '</code></pre>\
	        <p>Для команд <span class="inline-code">right</span> и <span class="inline-code">forward</span>\
	        тоже можно написать в скобках число. И тогда танк будет поворачивать и ехать сколько раз,\
	        сколько написано между скобок.\
	        <p>В этом задании приведи танк на клетку с кружком четыремя командами.\
	        Четырёх команд хватит – ведь теперь ты знаешь для чего после них ставятся скобки.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	        ]
	    ),

	    new Level(
	        'Уровень #4: как это называется?',

	        '  b            b  ' + '\n' +
	        '  b     p      b  ' + '\n' +
	        '  b            b  ' + '\n' +
	        '  bbbbbb bbbbbbb  ' + '\n' +
	        '     b     b      ' + '\n' +
	        '     b     b      ' + '\n' +
	        '                  ' + '\n' +
	        '     b     b      ' + '\n' +
	        '     b     b      ' + '\n' +
	        '     bbbbbbb      ' + '\n' +
	        '                  ' + '\n' +
	        '                  ' + '\n' +
	        '  bbbbbb bbbbbbb  ' + '\n' +
	        '  b            b  ' + '\n' +
	        '  b     t      b  ' + '\n' +
	        '  b            b  ',

	        '<p>Числа между скобок настоящие программисты называют параметрами. Или аргументами, кому как нравится.\
	        Правда, тебе не обязательно это запоминать, но если запомнишь, то ты молодец!\
	        <p>А вот тебе вопрос: как ты думаешь, сколько проедет танк, если написать <span class="inline-code">forward(1)</span>?\
	        Да, он проедет одну клетку, ведь между скобками написано <span class="inline-code">1</span>.\
	        А ты помнишь, что на первом и втором уровне ты не писал никаких чисел между скобками, и танк тоже ехал одну клетку?\
	        И вот сейчас получается что команда <span class="inline-code">forward(1)</span>\
	        ничем не отличается от команды <span class="inline-code">forward()</span>.\
	        <p>Так получается потому что команда передвигает танк на одну клетку, и если между скобками числа нет,\
	        то она больше ничего не делает. А если там <span class="inline-code">1</span>, то она видит,\
	        что танк уже проехал одну клетку, и тоже больше ничего не делает.\
	        <p>Наверное, ты уже понял что писать <span class="inline-code">1</span> между скобками не обязательно.\
	        Кстати, такие "необязательные" числа программисты называют "числами по умолчанию".\
	        Впрочем, это тоже не обязательно запоминать. А нужно запомнить только то, что для всех команд которые ты уже знаешь\
	        единицу в скобках можно не писать если танку нужно проехать только одну клетку или повернуть только один раз.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	        ]
	    ),

	    new Level(
	        'Уровень #5: препятствия',

	        'bbbbbbbbbbbbbbbbbb' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'b        t       b' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbb bb' + '\n' +
	        'b                b' + '\n' +
	        'bb bbbbbbbbbbbbbbb' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbb bb' + '\n' +
	        'b                b' + '\n' +
	        'b        p       b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbbbbb',

	        '<p>На прошлом уровне ящики помешали проехать к кружку напрямую, и их пришлось объехать.\
	        Но программа не должна была получиться очень длинной, если ты записывал число ходов между скобок для команды\
	        <span class="inline-code">forward</span>\
	        <p>Как ты помнишь, ниже есть справочник с командами.\
	        В нём между скобкок у каждой команды написано <span class="inline-code">разы = 1</span>.\
	        Это напоминание, что число между скобками – это <span class="inline-code">разы</span>,\
	        то есть, сколько раз нужно повторить команду.\
	        А если между скобок ничего не написать, то команда просто выполнится <span class="inline-code">1</span> раз.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	        ]
	    ),

	    new Level(
	        'Уровень #6: выстрелы',

	        'bbbbbbbbbbbbbbbbbb' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'b        t       b' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbb bb' + '\n' +
	        'b                b' + '\n' +
	        'bb bbbbbbbbbbbbbbb' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbb bb' + '\n' +
	        'b                b' + '\n' +
	        'b        p       b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbbbbb',

	        '<p>Танк умеет стрелять с помощью команды <span class="inline-code">fire</span>.\
	        От выстрелов ящики разрушаются.\
	        Oдной командой <span class="inline-code">fire</span> можно выстрелить несколько раз\
	        если ей записать число между скобок.\
	        <p>Наверное, ты легко догадаешься в какие ящики надо стрелять чтобы проложить короткий путь к кружку,\
	        а значит, программа должна получиться намного короче чем в прошлый раз.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	            { name: 'fire( разы = 1 )', description: 'выстрелить' },
	        ]
	    ),

	    new Level(
	        'Уровень #7: насколько целей',

	        'bbbbbbbbbbbbbbbbbb' + '\n' +
	        'b                b' + '\n' +
	        'b   t         t  b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'b      sssss     b' + '\n' +
	        'b      s   s     b' + '\n' +
	        'b      s p       b' + '\n' +
	        'b      s   s     b' + '\n' +
	        'b      sssss     b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'b   t         t  b' + '\n' +
	        'b                b' + '\n' +
	        'b                b' + '\n' +
	        'bbbbbbbbbbbbbbbbbb',

	        '<p>В игре может быть несколько клеток с кружками, и танк должен побывать на каждой из них.\
	        <p>Кстати, камни – не ящики, их нельзя разбить выстрелами.\
	        <p>Написав программу, запомни её – это пригодится на следующем уровне.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	            { name: 'fire( разы = 1 )', description: 'выстрелить' },
	        ]
	    ),

	    new Level(
	        'Уровень #8: повторы',

	        'ssssssssssssssssss' + '\n' +
	        'sbbsssssssssssssss' + '\n' +
	        'sbbssss   tsssssss' + '\n' +
	        'sssssss ssssssssss' + '\n' +
	        'sssssssbssssssssss' + '\n' +
	        'sssssss ssssssssss' + '\n' +
	        'ssss    ssssssssss' + '\n' +
	        'ssss sssssssssssss' + '\n' +
	        'ssssbsssssssssssss' + '\n' +
	        'ssss sssssssssssss' + '\n' +
	        's    sssssssssbbbs' + '\n' +
	        's ssssssssssssbbbs' + '\n' +
	        'sbssssssssssssbbbs' + '\n' +
	        's ssssssssssssssss' + '\n' +
	        ' p                ' + '\n' +
	        '                  ',

	        '<p>Кажется, программу на прошлом уровне было очень скучно писать.\
	        Ведь сначала дважды нужно было написать <span class="inline-code">right()</span> и\
	        <span class="inline-code">forward(5)</span>, а потом трижды \
	        <span class="inline-code">right()</span> и <span class="inline-code">forward(10)</span>.\
	        <p>Чтобы не писать одни и те же команды по многу раз, используют специальную инструкцию \
	        для повтора – <span class="inline-code">loop() { }</span>.\
	        Она похожа на обычную команду, и после неё пишутся скобки в которых надо написать\
	        сколько будет повторов.\
	        Но затем нужно ещё написать фигурные скобки <span class="inline-code">{ }</span>,\
	        а между ними написать команды которые надо повторять.\
	        <p>Непонятно? Тогда посмотри как можно было написать программу на прошлом уровне:\
	              <pre><code class="js">' +
	                'loop(2) {\n'+
	                '    right();\n'+
	                '    forward(5);\n'+
	                '}\n'+
	                'loop(3) {\n'+
	                '    right();\n'+
	                '    forward(10);\n'+
	                '}\n'+
	            '</code></pre>\
	        <p>Итак, запомним: сначала пишем <span class="inline-code">loop() {</span>,\
	        потом с новой строчки пишем команды которые повторяются, и наконец пишем <span class="inline-code">}</span>.\
	        <p>А теперь попробуй пройти этот уровень с помощью одной инструкции <span class="inline-code">loop</span>\
	        и пяти команд. Когда будешь писать программу, всё время посматривай на пример – у тебя должно получиться\
	        похоже, только команд между фигурными скобками будет побольше. Если не получается, то перечитай всё с начала\
	        обращая внимание на то где должна быть инструкция <span class="inline-code">loop</span>,\
	        где фигурные скобки, и где команды.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	            { name: 'fire( разы = 1 )', description: 'выстрелить' },
	            { name: 'loop( разы ) { }', description: 'повторить' },
	        ]
	    ),

	    new Level(
	        'Уровень #9: ещё о повторах',

	        /*
	        '         p        ' + '\n' +
	        '            sssss ' + '\n' +
	        '            b t s ' + '\n' +
	        '  sssss     sssss ' + '\n' +
	        '  b t s           ' + '\n' +
	        '  sssss     sssss ' + '\n' +
	        '            b t s ' + '\n' +
	        '  sssss     sssss ' + '\n' +
	        '  b t s           ' + '\n' +
	        '  sssss     sssss ' + '\n' +
	        '            b t s ' + '\n' +
	        '  sssss     sssss ' + '\n' +
	        '  b t s           ' + '\n' +
	        '  sssss           ' + '\n' +
	        '                  ' + '\n' +
	        '                  ',
	        */
	        '          b       ' + '\n' +
	        '          b       ' + '\n' +
	        '          b       ' + '\n' +
	        '          b       ' + '\n' +
	        'bbbbbssssss sbbbbb' + '\n' +
	        '     s    s s     ' + '\n' +
	        '     sbss s s     ' + '\n' +
	        '     s s  s s     ' + '\n' +
	        '     s st s s     ' + '\n' +
	        '     s ssssbs     ' + '\n' +
	        '    ps b    s     ' + '\n' +
	        'bbbbbssssssssbbbbb' + '\n' +
	        '     b            ' + '\n' +
	        '     b            ' + '\n' +
	        '     b            ' + '\n' +
	        '     b            ',

	        '<p>Прекрасно, что тебе получись справиться с прошлым заданием!\
	        А сейчас две заметки про повторы, которые просто полезно знать:\
	        <p>Первая: программисты повторы называют циклами. Наверное, им так больше нравится.\
	        <p>Вторая: если повторяется одна команда, то <span class="inline-code">loop</span>\
	        писать совсем не обязательно, ведь можно просто написать число повторов у команды между скобками.\
	        Посмотри: и такая программа:\
	             <pre><code class="js">' +
	                'forward(4);\n'+
	            '</code></pre>\
	        и такая\
	              <pre><code class="js">' +
	                'loop(4) {\n'+
	                '    forward();\n'+
	                '}\n'+
	            '</code></pre>\
	        и даже такая\
	              <pre><code class="js">' +
	                'loop(2) {\n'+
	                '    forward(2);\n'+
	                '}\n'+
	            '</code></pre>\
	        <p>делают одно и то же, но первая из них и проще и короче. А вот если есть несколько повторяющихся команд,\
	        то инструкция <span class="inline-code">loop</span> будет очень полезна.\
	        <p>Ну а сейчас выполни задание с танком используя три повтора,\
	        чтобы программа получилась не очень длинной.',

	        [
	            { name: 'forward( разы = 1 )', description: 'ехать вперёд' },
	            { name: 'left( разы = 1 )', description: 'повернуть налево' },
	            { name: 'right( разы = 1 )', description: 'повернуть направо' },
	            { name: 'fire( разы = 1 )', description: 'выстрелить' },
	            { name: 'loop( разы ) { }', description: 'повторить' },
	        ]
	    ),
	];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	class Level {
		constructor( name, field, instruction, availableCommands ) {
			this.name = name;
			this.field = field;
			this.instruction = instruction;
			this.availableCommands = availableCommands;

			this.startState = {
				cell: { x: 0, y: 0 },
				angle: 0
			};

			this.onStoneCreate = function( col, row ) { };
			this.onBoxCreate = function( col, row ) { };
			this.onTargetCreate = function( col, row ) { };
		}

		create() {
		    const rows = this.field.split( '\n' );
		    rows.forEach( (row, rowIndex) => {

		        const chars = row.split('');
		        chars.forEach( (cell, colIndex) => {

		            if (cell === 's') {
		            	this.onStoneCreate( colIndex, rowIndex );
		            }
		            else if (cell === 'b') {
		            	this.onBoxCreate( colIndex, rowIndex );
		            }
		            else if (cell === 't') {
		            	this.onTargetCreate( colIndex, rowIndex );
		            }
		            else if (cell === 'p') {
		            	this.startState.cell = { x: colIndex, y: rowIndex };
		            }
		        });
		    });
		}

		reset() {
		    const rows = this.field.split( '\n' );
		    rows.forEach( (row, rowIndex) => {

		        const chars = row.split('');
		        chars.forEach( (cell, colIndex) => {

		            if (cell === 'b') {
		            	this.onBoxCreate( colIndex, rowIndex );
		            }
		        });
		    });
		}
	}

	module.exports = Level;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const css = __webpack_require__(13);

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./instruction.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./instruction.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#instruction {\n  font-size: 1.2em;\n  font-family: 'Roboto', sans-serif;\n  box-sizing: border-box;\n}\n#instruction .title {\n  color: #8C4A07;\n  margin-top: 0;\n  padding-top: 0.3em;\n  padding-left: 0.5em;\n}\n#instruction .inline-code {\n  background-color: #fac998;\n  color: #444;\n  font-family: 'Roboto Mono', monospace;\n  padding: 0 0.5em;\n  border-radius: 5px;\n}\n#instruction .text {\n  border-radius: 5px;\n  background-color: #8C4A07;\n  color: #ffd;\n  padding: 0.3em 0.5em;\n  line-height: 1.4em;\n}\n#instruction .text p {\n  margin-bottom: 0.6em;\n}\n#instruction .text pre {\n  font-family: 'Roboto Mono', monospace;\n  font-size: 1em;\n  padding: 0;\n}\n#instruction .command-list-title {\n  color: #8C4A07;\n  padding-left: 0.5em;\n}\n#instruction .command-list {\n  background-color: #8C4A07;\n  color: #ffd;\n  padding: 0.3em 0.5em 0.3em 2.5em;\n  text-indent: -2em;\n  line-height: 1.4em;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const css = __webpack_require__(16);
	const enableEditorUtils = __webpack_require__(18);

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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./code.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./code.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#code {\n  position: relative;\n  font-size: 1.2em;\n  height: 100%;\n  box-sizing: border-box;\n}\n#code .title {\n  color: #8C4A07;\n  font-family: 'Roboto Condensed', sans-serif;\n  margin-top: 0;\n  padding-top: 0.3em;\n  padding-left: 0.5em;\n}\n#code textarea {\n  background-color: #fffcf9;\n  color: #8C4A07;\n  font-family: 'Oxygen Mono', monospace;\n  line-height: 1.3em;\n  padding: 0.3em;\n  box-sizing: border-box;\n  border: 2px solid #8C4A07;\n  position: absolute;\n  width: 100%;\n  height: calc(100% - 5em);\n}\n#code textarea.errorLine {\n  background-image: -webkit-linear-gradient(#fbb, #fbb);\n  background-image: linear-gradient(#fbb, #fbb);\n  background-repeat: no-repeat;\n  background-attachment: scroll;\n  background-size: 100% 1.3em;\n}\n#code textarea.executionLine {\n  background-image: -webkit-linear-gradient(#bfb, #bfb);\n  background-image: linear-gradient(#bfb, #bfb);\n  background-repeat: no-repeat;\n  background-attachment: scroll;\n  background-size: 100% 1.3em;\n}\n#code .error {\n  position: fixed;\n  width: 100%;\n  bottom: 0;\n  margin-bottom: 0 !important;\n  max-height: 10em;\n  overflow-y: auto;\n  z-index: 1;\n}\n#code .error.hidden {\n  display: none !important;\n}\n#code .error .error-msg {\n  font-size: smaller;\n}\n#code .buttons {\n  font-family: 'Roboto', sans-serif;\n  position: absolute;\n  display: block !important;\n  bottom: 0px;\n}\n#code .buttons button {\n  font-size: 1.2em !important;\n}\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

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


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	/* globals Phaser */

	const WIDTH = 18;
	const HEIGHT = 16;
	const TILE_SIZE = 48;
	const TANK_ANIMATION_RATE = 5; // frames per s
	const TARGET_ANIMATION_RATE = 20; // frames per s
	const CONGRAT_SIZE = { x: 320, y: 64 } ;
	const BACK_SOUND_VOLUME = 0.1;
	const EFFECT_SOUND_VOLUME = 0.3;

	const graphicsPath = 'assets/graphics/';
	const audioPath = 'assets/audio/';

	let game;
	let player;
	let stones;
	let boxes;
	let targets;
	let congratulation;
	let weapon;

	let gameCreatedCallback;
	let executionFinishedCallback;
	//let completedText;

	let backSound;
	// let runSound;
	let tankSound;
	let tankSoundTimer;

	const state = {
	    velocity: { x: 0, y: 0 },
	    location: { x: 0, y: 0 },
	    angularVelocity: 0,
	    angle: 0
	};

	const timers = {
		moveCorrection: null,
		rotationCorrection: null,
		fire: null
	};

	function log(...args) {
	//	console.log(...args);
	}

	function preload () {
	    game.load.image( 'ground', graphicsPath + 'ground.png' );
	    game.load.image( 'stone', graphicsPath + 'stone.png' );
	    game.load.image( 'box', graphicsPath + 'box.png' );
	    game.load.image( 'bullet', graphicsPath + 'bullet.png' );
	    game.load.spritesheet( 'congratulation', graphicsPath + 'congrats.png', CONGRAT_SIZE.x, CONGRAT_SIZE.y );
	    game.load.spritesheet( 'target', graphicsPath + 'target.png', TILE_SIZE, TILE_SIZE );
	    game.load.spritesheet( 'tank', graphicsPath + 'tank.png', TILE_SIZE, TILE_SIZE );

	    game.load.audio( 'back', audioPath + 'back.mp3' );
	    // game.load.audio( 'run', audioPath + 'run.mp3' );
	    game.load.audio( 'shot', audioPath + 'shot.mp3' );
	    game.load.audio( 'tank', audioPath + 'tank.mp3' );
	    game.load.audio( 'finished', audioPath + 'finished.mp3' );

	    game.load.onLoadComplete.add( () => {
	    	backSound = game.sound.play( 'back', BACK_SOUND_VOLUME, true );
	    	tankSound = game.sound.play( 'tank', EFFECT_SOUND_VOLUME );
	    	if (tankSound) {
	    		tankSound.stop();
	    	}
	    	// runSound = game.sound.play( 'run', 0.01, true );
	    	// runSound.pause();
	    	// runSound.onFadeComplete.add( (obj, volume) => {
	    	// 	if (volume < RUN_SOUND_VOLUME / 2) {
	    	// 		runSound.pause();
	    	// 	}
	    	// });
	    });

	    CONGRAT_SIZE.x *= 2;
	    CONGRAT_SIZE.y *= 2;
	}

	function create () {
	    game.physics.startSystem( Phaser.Physics.ARCADE );

	    game.add.tileSprite( 0, 0, WIDTH * TILE_SIZE, HEIGHT * TILE_SIZE, 'ground' );

	    stones = game.add.group();
	    stones.enableBody = true;

	    boxes = game.add.group();
	    boxes.enableBody = true;

	    targets = game.add.group();
	    targets.enableBody = true;

	    congratulation = game.add.image( (game.width - CONGRAT_SIZE.x) / 2, (game.height - CONGRAT_SIZE.y) / 2, 'congratulation' );
	    congratulation.width = CONGRAT_SIZE.x;
	    congratulation.height = CONGRAT_SIZE.y;
	    congratulation.sendToBack();

	    player = game.add.sprite( TILE_SIZE, TILE_SIZE, 'tank' );

	    player.animations.add( 'forward', [0, 1, 2], TANK_ANIMATION_RATE, true );

	    game.physics.arcade.enable( player );
	    player.body.collideWorldBounds = true;
	    player.anchor.x = 0.5;
	    player.anchor.y = 0.5;

	    weapon = game.add.weapon( -1, 'bullet' );
	    weapon.trackSprite( player );
	    weapon.bulletSpeed = 500;

	    //scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

	    gameCreatedCallback();
	}

	function update () {
	    if (isExecutionDestinationReached()) {
	    	finishExecution();
	    }

	    player.body.velocity.x = state.velocity.x;
	    player.body.velocity.y = state.velocity.y;
	    player.body.angularVelocity = state.angularVelocity;
	    if (state.velocity.x || state.velocity.y)
			log('f', player.x, player.y);
	    if (state.angularVelocity)
			log('r', player.angle);

	    const hitStones = game.physics.arcade.collide( player, stones );
	    const hitBoxes = game.physics.arcade.collide( player, boxes );
	    game.physics.arcade.overlap( weapon.bullets, boxes, (bullet, box) => {
	    	bullet.kill();
	    	box.kill();
	    } );
	    game.physics.arcade.overlap( player, targets, convertTarget, checkPlayerAndTargetCollisin );
	}

	function isExecutionDestinationReached() {
		if (state.velocity.x || state.velocity.y) {
			if (Math.abs( state.location.x - player.x) < 3 && Math.abs( state.location.y - player.y) < 3) {
				const final = { x: state.location.x, y : state.location.y };
			    timers.moveCorrection = setTimeout( () => {
					player.x = final.x;
					player.y = final.y;
					timers.moveCorrection = null;
					log('forward-final:', player.x, player.y);
			    }, 50);
				log('forward-finished');
				return true;
			}
		}
		else if (state.angularVelocity) {
			const diff = Math.abs( Math.sin( state.angle * Math.PI / 180 ) - Math.sin( player.angle * Math.PI / 180 ) );
			if ( diff < 0.005) {
				const final = state.angle;
			    timers.rotationCorrection = setTimeout( () => {
					player.angle = final;
					timers.rotationCorrection = null;
					log('rotate-final:', player.angle);
			    }, 50);
				log('rotate-finished');
				return true;
			}
		}

		return false;
	}

	function convertTarget( player, target ) {
		target.animations.play( 'done' );
	}

	function checkPlayerAndTargetCollisin( player, target ) {
	    return player.body.hitTest( target.centerX, target.centerY );
	}

	function finishExecution() {
	    state.velocity = { x: 0, y: 0 };
	    state.angularVelocity = 0;

	    player.animations.stop();

	    executionFinishedCallback();
	    executionFinishedCallback = undefined;
	}

	function deferTankSound( delay ) {
		tankSoundTimer = setTimeout( () => {
			tankSoundTimer = null;
			if (tankSound) {
				tankSound.play();
			}
		}, delay);
	}

	function getTargetAnimationArray( count ) {
		const result = [];
		for (let i = 0; i < count; i++) {
			result.push( i );
		}
		return result;
	}

	module.exports = {
		init: function( elemID ) {
			return new Promise( (resolve, reject) => {
				gameCreatedCallback = resolve;
				game = new Phaser.Game(
				 	WIDTH * TILE_SIZE,
				 	HEIGHT * TILE_SIZE,
				 	Phaser.CANVAS,
				 	elemID, {
			 			preload: preload,
			 			create: create,
			 			update: update
			 		}
		 		);
			});
		},

		startExecution: function() {
			// if (backSound) {
			// 	backSound.pause();
			// }
			// if (runSound && runSound.paused) {
			// 	runSound.resume();
			// 	runSound.fadeTo( volume = RUN_SOUND_VOLUME );
			// }
		},

		stopExecution: function( isCompleted ) {
			// if (!isCompleted && runSound && !runSound.resumed) {
			// 	runSound.fadeTo( volume = 0.01 );
			// }
			weapon.killAll();

			if (tankSound && tankSound.isPlaying) {
				tankSound.fadeOut();
			}

			if (tankSoundTimer) {
				clearTimeout( tankSoundTimer );
				tankSoundTimer = null;
			}

			// setTimeout( () => {
			// 	if (backSound) {
			// 		if (isCompleted) {
			// 			backSound.stop();
			// 		}
			// 		else {
			// 			backSound.resume();
			// 		}
			// 	}
			// }, 1000);
		},

		execute: function( command, done ) {
			if (command.velocity) {
				if (timers.moveCorrection) {
					clearTimeout( timers.moveCorrection );
					timers.moveCorrection = null;
				}

				if (player.angle < -135 || player.angle > 135) {
					state.velocity = { x: 0, y: command.velocity };
					state.location.y += TILE_SIZE;
				}
				else if (player.angle < -45) {
					state.velocity = { x: -command.velocity, y: 0 };
					state.location.x -= TILE_SIZE;
				}
				else if (player.angle < 45) {
					state.velocity = { x: 0, y: -command.velocity };
					state.location.y -= TILE_SIZE;
				}
				else {
					state.velocity = { x: command.velocity, y: 0 };
					state.location.x += TILE_SIZE;
				}

				log('forward from', player.x, player.y, 'to', state.location.x, state.location.y);
			}
			else if (command.angularVelocity) {
				if (timers.rotationCorrection) {
					clearTimeout( timers.rotationCorrection );
					timers.rotationCorrection = null;
				}

		        state.angularVelocity = command.angularVelocity;
		        state.angle += state.angularVelocity > 0 ? 90 : -90;
		        while (state.angle > 180) { state.angle -= 360; }
		        while (state.angle <-180) { state.angle += 360; }
				log('rotate from', player.angle, 'to', state.angle);
			}
			else if (command.name === 'fire') {
				let angle = player.angle - 90;
				while (angle < 0) { angle += 360; }
				weapon.trackOffset.x = TILE_SIZE / 2 * Math.sin( player.rotation );
				weapon.trackOffset.y = -TILE_SIZE / 2 * Math.cos( player.rotation );
			    weapon.fireAngle = angle;
				weapon.fire();

				timers.fire = setTimeout( () => {
					timers.fire = null;
					finishExecution();
				}, command.duration );

				game.sound.play( 'shot', EFFECT_SOUND_VOLUME );
			}
			else {
				console.log( 'game.execute: invalid command' );
				return;
			}

		    if (player.animations.getAnimation( command.name )) {
		        player.animations.play( command.name );
		    }

			if (command.velocity && !tankSoundTimer && tankSound && !tankSound.isPlaying) {
				deferTankSound( 1500 );
			}
			else if (!command.velocity && tankSoundTimer) {
				clearTimeout( tankSoundTimer );
				tankSoundTimer = null;
			}

		    executionFinishedCallback = done;
		},

	    isLevelCompleted: function() {
	    	let allTargetVisited = true;
		    targets.forEach( target => {
		    	const animation = target.animations.currentAnim;
		    	const isAnimationDone = animation && animation.name === 'done';
		        allTargetVisited = allTargetVisited && isAnimationDone;
		    }, this);

		    return allTargetVisited;
		},

		showCongratulation: function() {
			return new Promise( (resolve, reject) => {
				setTimeout( () => {
					congratulation.frame = Math.floor( Math.random() * (game.cache.getFrameCount( congratulation.key ) - 1) );
				    congratulation.bringToTop();
					setTimeout( () => {
					    congratulation.sendToBack();
					    resolve();
					}, 2000 );
				}, 1000 );
			});
		},

		finish: function() {
			if (backSound) {
				backSound.fadeOut();
			}

			game.sound.play( 'finished', BACK_SOUND_VOLUME, true );

			return new Promise( (resolve, reject) => {
				setTimeout( () => {
					congratulation.frame = game.cache.getFrameCount( congratulation.key ) - 1;
				    congratulation.bringToTop();
					setTimeout( () => {
					    resolve();
					}, 2000);
				}, 1000);
			});
		},

		newLevel: function() {
		    stones.removeAll( true );
		    boxes.removeAll( true );
		    targets.removeAll( true );
		  //   	if (runSound && !runSound.resumed) {
				// 	runSound.fadeTo( volume = 0.01 );
				// }
		  //   	if (backSound) {
		  //   		if (backSound.paused) {
				// 		backSound.resume();
		  //   		}
		  //   		else {
				// 		backSound.play( '', 0, BACK_SOUND_VOLUME );
		  //   		}
				// }
		},

		resetLevel: function( startState, resetKilled ) {
			state.location = {
				x: (startState.cell.x + 0.5) * TILE_SIZE,
				y: (startState.cell.y + 0.5) * TILE_SIZE,
			};
			state.angle = startState.angle;

	        player.x = state.location.x;
		    player.y = state.location.y;

		    player.angle = state.angle;

		    targets.forEach( target => {
		    	setTimeout( () => {
				    target.animations.play( 'initial' );
		    	}, 150);
		    });

		    if (resetKilled) {
			    boxes.removeAll( true );
		    }
		},

		createStone: function( col, row ) {
	        const stone = stones.create( col * TILE_SIZE, row * TILE_SIZE, 'stone' );
	        stone.body.immovable = true;
		},

		createBox: function( col, row ) {
	        const box = boxes.create( col * TILE_SIZE, row * TILE_SIZE, 'box' );
	        box.body.immovable = true;
		},

		createTarget: function( col, row ) {
	        const target = targets.create( col * TILE_SIZE, row * TILE_SIZE, 'target' );
	        const frameCount = game.cache.getFrameCount( 'target' );

		    target.animations.add( 'initial', getTargetAnimationArray( frameCount - 2 ), TARGET_ANIMATION_RATE, true );
		    target.animations.add( 'done', [frameCount - 1], 1, false );

		    target.animations.play( 'initial' );
		}
	};

/***/ }
/******/ ]);