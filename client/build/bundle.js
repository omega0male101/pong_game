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
/******/ 	return __webpack_require__(__webpack_require__.s = 83);
/******/ })
/************************************************************************/
/******/ ({

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// var update = require('./update')
//Refresh at 60 frames each second
var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

//score
// var score = document.createElement('p');
//   score.setAttribute("id", "score");

//   document.getElementById('score').innerHTML = "You pressed button 1";

//Create Canvas
var canvas = document.createElement('canvas');
var width = 900;
var height = 450;
canvas.width = width;
canvas.height = height;
canvas.setAttribute("id", "canvas");
canvas.fillStyle = "#000000";

var context = canvas.getContext('2d');

//Load page using the animate method followed by our step method to update objects inside canvas
window.onload = function () {
  document.body.appendChild(canvas);
  // document.body.appendChild(score);
  animate(step);
};

var step = function step() {
  update();
  render();
  animate(step);
};

////////////////////////////////////////////////////
////////////////////////////////////////////////////

// Paddles and the Ball
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

//Create ship objects
function Player() {
  this.paddle = new Paddle(10, 200, 12, 70);
}

function Computer() {
  this.paddle = new Paddle(878, 200, 12, 70);
}

//Render the players - add scores!!
Player.prototype.render = function () {
  this.paddle.render();
};

Computer.prototype.render = function () {
  this.paddle.render();
};

// Create Ball

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = -4;
  this.y_speed = 0;
  this.radius = 9;
}

Ball.prototype.render = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
};

// Build objects
var player = new Player();
var computer = new Computer();
var ball = new Ball(450, 225);

var render = function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

////////////////////////////////////////////////////////////
///////////////////////ANIMATIONS///////////////////////////
////////////////////////////////////////////////////////////


var update = function update() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};

Ball.prototype.update = function (playerPaddle, computerPaddle) {
  this.y += this.y_speed;
  this.x += this.x_speed;

  var leftEdge_X = this.x - 5;
  var leftEdge_Y = this.y - 5;
  var rightEdge_X = this.x + 5;
  var rightEdge_Y = this.y + 5;

  //Hitting Top/Bottom Edges..
  if (this.y + 5 < 0) {
    // hitting the top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > 450) {
    // hitting the bottom wall
    this.y = 445;
    this.y_speed = -this.y_speed;
  }

  //Hitting wall and scoring a point
  if (this.x < 0 || this.x > 900) {
    this.x_speed = -4;
    this.y_speed = 0;
    this.x = 450;
    this.y = 225;
  }

  //Paddle Dynamics
  //Player Paddle
  if (leftEdge_X < 450) {
    console.log(leftEdge_X);
    console.log(playerPaddle.x + playerPaddle.width);
    console.log("Left hand side");
    if (leftEdge_X < playerPaddle.x + playerPaddle.width && rightEdge_Y > playerPaddle.y && leftEdge_Y < playerPaddle.y + playerPaddle.height && rightEdge_X > playerPaddle.x) {
      // hit the player's paddle
      this.x += this.x_speed;
      this.x_speed = 4;
      this.y_speed += playerPaddle.y_speed / 2;
    }
  }

  //Computer
  else {
      console.log("Right hand side");
      console.log(leftEdge_X);
      console.log(computerPaddle.x + computerPaddle.width);
      if (leftEdge_X > computerPaddle.x + computerPaddle.width - 15 && rightEdge_Y > computerPaddle.y && leftEdge_Y < computerPaddle.y + computerPaddle.height && rightEdge_X > computerPaddle.x) {
        // hit the computer's paddle
        this.x_speed = -4;
        this.y_speed += computerPaddle.y_speed / 2;
        this.x += this.x_speed;
      }
    }
};

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

//Computer following center of the ball..
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
  } else if (this.paddle.y + this.paddle.height > 900) {
    this.paddle.y = 900 - this.paddle.height;
  }
};

////////////////////keys///////////////////////////

//Mapping keyboard keys to player
Player.prototype.update = function () {
  for (var key in keysDown) {
    var value = Number(key);

    if (value == 38) {
      // up arrow
      this.paddle.move(-4, 0);
    } else if (value == 40) {
      // down arrow
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map