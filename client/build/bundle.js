/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/////////////////////////////////////////////////////
//------------------Starting App-------------------//

//<<Refresh at 60 frames each second>>
var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

//Load page using the animate method followed by our step method to update objects inside canvas

window.onload = function () {

  //Toggle the Backgroud Audio On & Off
  var audioToggle = document.createElement('img');
  audioToggle.setAttribute("id", "audio-toggle");
  audioToggle.src = "./public/Images/volume_on.png";

  var isAudioEnabled = true;
  audioToggle.addEventListener("click", function () {
    if (isAudioEnabled) {
      audioToggle.src = "./public/Images/volume_on.png";
      audio1.play();
    } else {
      audioToggle.src = "./public/Images/volume_off.png";
      audio1.pause();
    }
    isAudioEnabled = !isAudioEnabled;
  });

  //Appending all elements to HTML page
  canvasContainerDiv.appendChild(canvas);
  topWrapper.appendChild(scorePlayerDiv);
  topWrapper.appendChild(canvasContainerDiv);
  topWrapper.appendChild(scoreComputerDiv);
  toneDiv.appendChild(toneToggle);
  toneDiv.appendChild(toneText);
  audioDiv.appendChild(audioText);
  audioDiv.appendChild(audioToggle);
  bottomWrapper.appendChild(toneDiv);
  bottomWrapper.appendChild(audioDiv);

  document.body.appendChild(topWrapper);
  document.body.appendChild(bottomWrapper);

  scorePlayerDiv.innerText = "" + 0;
  scoreComputerDiv.innerText = "" + 0;

  animate(step);

  //Background Music
  var audio1 = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  audio1.play();
  audio1.volume = 0.1;
};

var step = function step() {
  update();
  render();
  animate(step);
};

var update = function update() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};

var render = function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

//------------------Starting App-------------------//
/////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
//------------------Creating Objects-------------------//

var canvas = document.createElement('canvas');
var width = 900;
var height = 450;
canvas.width = width;
canvas.height = height;
canvas.setAttribute("id", "canvas");
canvas.fillStyle = "#000000";
// canvas.z-index = 0;

var context = canvas.getContext('2d');

// Build objects
var player = new Player();
var computer = new Computer();
var ball = new Ball(450, 225);

//Create ship objects
function Player() {
  this.paddle = new Paddle(10, 200, 12, 70);
}
Player.prototype.render = function () {
  this.paddle.render();
};

function Computer() {
  this.paddle = new Paddle(878, 200, 12, 70);
}
Computer.prototype.render = function () {
  this.paddle.render();
};

//------------------Creating Objects-------------------//
/////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//-----------------------Defining Objects-------------------//

//<<Setting up paddles and the ball>>
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function () {
  context.fillStyle = "white";
  context.fillRect(this.x, this.y, this.width, this.height);
};

//<<Setting Up Ball>>
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = -5;
  this.y_speed = 0;
  this.radius = 9;
}

Ball.prototype.render = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
};

//-----------------------Defining Objects-------------------//
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//----------------------KeyBoard Controls-------------------//

Player.prototype.update = function () {
  for (var key in keysDown) {
    var value = Number(key);

    var rightArrow = 19;
    var leftArrow = 19;

    if (value == 38) {
      // 'up' arrow
      this.paddle.move(-4, 0);
    } else if (value == 40) {
      // 'down' arrow
      this.paddle.move(4, 0);
    } else if (value == 67) {
      console.log("Hit the C button");
      console.log(_rightArrow);
      console.log(_leftArrow);
      var _rightArrow = 39;
      console.log(_rightArrow);
      var _leftArrow = 37;
      console.log(_leftArrow);
    } else if (value == leftArrow) {
      console.log("jeeleo");
      this.paddle.move(0, -4);
    } else if (value == rightArrow) {
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
    if (value == 32) {
      window.location.href = 'http://localhost:3000';
    }
  }
};

var keysDown = {};

window.addEventListener("keydown", function (event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
  delete keysDown[event.keyCode];
});

//----------------------KeyBoard Controls-------------------//
//////////////////////////////////////////////////////////////

/////////////Sound Dependencies/////////////////
var beep = new Audio('./public/Sounds/Boop.wav');
var boop = new Audio('./public/Sounds/Beep.wav');
var winner = new Audio('./public/Sounds/Tasty_Shot.wav');
var loser = new Audio('./public/Sounds/Better_Luck.wav');

//Score Records
var playerScore = 0;
var computerScore = 0;

////////////////////////////////////////////////////////////////////
//-=-=-=-=-=-=-=-=-=-=-Game Logic & Animations-=-=-=-=-=-=-=-=-=-=//

Ball.prototype.update = function (playerPaddle, computerPaddle) {
  this.y += this.y_speed;
  this.x += this.x_speed;

  var ballLeft_X = this.x - 5;
  var ballLeft_Y = this.y - 5;
  var ballRight_X = this.x + 5;
  var ballRight_Y = this.y + 5;

  //----Ball Hitting Top/Bottom Edges----//
  if (this.y + 5 < 0) {
    // hitting the top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > 450) {
    // hitting the bottom wall
    this.y = 445;
    this.y_speed = -this.y_speed;
  }

  //Scores
  if (this.x < 0) {
    // adding score
    computerScore += 1;
    loser.play();
    scoreComputerDiv.innerText = "" + computerScore;
    console.log('player score');
    this.x_speed = -5;
    this.y_speed = 0;
    this.x = 450;
    this.y = 225;
  } else if (this.x > 900) {
    // adding score

    playerScore += 1;
    winner.play();
    scorePlayerDiv.innerText = "" + playerScore;
    console.log('computer score');
    this.x_speed = -5;
    this.y_speed = 0;
    this.x = 450;
    this.y = 225;
  }

  //------Ball Collition Dynamics------//

  if (ballLeft_X < 450) {
    // To asses which side the ball is at.
    // console.log("Left hand side")

    //<<<<<<<<<<<<<<PLAYER TURN>>>>>>>>>>>>//
    if (ballLeft_X < playerPaddle.x + playerPaddle.width && ballRight_Y > playerPaddle.y && ballLeft_Y < playerPaddle.y + playerPaddle.height && ballRight_X > playerPaddle.x) {

      // On collition
      boop.play();
      this.x += this.x_speed; // Add Speed to ball
      this.x_speed = 4; // Change X Direction
      this.y_speed += playerPaddle.y_speed / 2; // Change Y Direction
    }
  } else {
    // console.log("Right hand side")

    //<<<<<<<<<<<<<<COMPUTER TURN>>>>>>>>>>>>//
    if (ballLeft_X > computerPaddle.x + computerPaddle.width - 15 && ballRight_Y > computerPaddle.y && ballLeft_Y < computerPaddle.y + computerPaddle.height && ballRight_X > computerPaddle.x) {

      // On collition
      beep.play();
      this.x_speed = -4; // Change X Direction
      this.y_speed += computerPaddle.y_speed / 2; // Change Y Direction
      this.x += this.x_speed; // Add Speed to ball
    }
  }
};

////////////////////////////////
//------Paddle Movements------//

//<<Player Paddle Movements>>
Paddle.prototype.move = function (y, x) {

  this.x_speed = x;
  this.y_speed = y;

  this.x += x;
  this.y += y;

  if (this.y < 0) {
    // hitting top
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > 450) {
    // hitting bottom
    this.y = 450 - this.height;
    this.y_speed = 0;
  }
};

//<<Computer Paddle Movements - (Centering)>>
Computer.prototype.update = function (ball) {
  var y_pos = ball.y;
  var diff = -(this.paddle.y + this.paddle.height / 2 - y_pos);

  //Speed of paddle movement
  if (diff < 0 && diff < -4) {
    //Speed going to top
    diff = -4;
  } else if (diff > 0 && diff > 4) {
    //Speed going to bottom
    diff = 4;
  }
  this.paddle.move(diff, 0);

  if (this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 450) {
    this.paddle.y = 450 - this.paddle.height;
  }
};

//^-----Paddle Movements-----^//
////////////////////////////////

//-=-=-=-=-=-=-=-=-=-=-=-Game Logic & Animations-=-=-=-=-=-=-=-=-=-=-=//
////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////
//----------------------Features-------------------//


var scorePlayerDiv = document.createElement('div');
scorePlayerDiv.setAttribute("id", "scorePlayer");

var scoreComputerDiv = document.createElement('div');
scoreComputerDiv.setAttribute("id", "scoreComputer");

var canvasContainerDiv = document.createElement('div');
canvasContainerDiv.setAttribute("id", "canvasContainer");

var topWrapper = document.createElement('div');
topWrapper.setAttribute("id", "top-main-wrapper");

var bottomWrapper = document.createElement('div');
bottomWrapper.setAttribute("id", "bottom-main-wrapper");

var toneDiv = document.createElement('div');
toneDiv.setAttribute("id", "tone-div");

var toneText = document.createElement('span');
toneText.setAttribute("id", "tone-text");
toneText.innerText = "TOGGLE TONE";

var audioDiv = document.createElement('div');
audioDiv.setAttribute("id", "audio-div");

var audioText = document.createElement('span');
audioText.setAttribute("id", "audio-text");
audioText.innerText = "MUTE MUSIC";

var toneToggle = document.createElement('img');
toneToggle.setAttribute("id", "tone-toggle");
toneToggle.src = "./public/Images/minus.png";

var isToneEnabled = true;

toneToggle.addEventListener("click", function () {
  if (isToneEnabled) {
    toneToggle.src = "./public/Images/plus.png";
    boop.src = './public/Sounds/LowBeep.wav';
    beep.src = './public/Sounds/LowBoop.wav';
  } else {
    toneToggle.src = "./public/Images/minus.png";
    boop.src = './public/Sounds/Beep.wav';
    beep.src = './public/Sounds/Boop.wav';
  }
  isToneEnabled = !isToneEnabled;
});

//----------------------Features-------------------//
/////////////////////////////////////////////////////

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map