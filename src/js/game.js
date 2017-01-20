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