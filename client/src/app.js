// var update = require('./update')

/////////////////////////////////////////////////////
//------------------Starting App-------------------//

  //<<Refresh at 60 frames each second>>
  var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
     function(callback) { window.setTimeout(callback, 1000/60) };

  //Load page using the animate method followed by our step method to update objects inside canvas

  window.onload = function() {
    document.body.appendChild(canvas);
    // document.body.appendChild(score);
    animate(step);
  };

  var step = function() {
    update();
    render();
    animate(step);
  };

  var update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
  };

  var render = function() {
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

    var context = canvas.getContext('2d');


  // Build objects
    var player = new Player();
    var computer = new Computer();
    var ball = new Ball(450, 225);


  //Create ship objects
    function Player() {
       this.paddle = new Paddle(10, 200, 12, 70);
    }
      Player.prototype.render = function() {
        this.paddle.render();
      };

    function Computer() {
      this.paddle = new Paddle(878, 200, 12, 70);
    }
      Computer.prototype.render = function() {
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

    Paddle.prototype.render = function() {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
    };

  //<<Setting Up Ball>>
  function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = -4;
    this.y_speed = 0;
    this.radius = 9;
  }

    Ball.prototype.render = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
      context.fillStyle = "#FFFFFF";
      context.fill();
    };

//-----------------------Defining Objects-------------------//
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
//----------------------KeyBoard Controls-------------------//

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);

    if(value == 38) { // 'up' arrow
      this.paddle.move(-4, 0);
    } else if (value == 40) { // 'down' arrow
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

var keysDown = {};

  window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
  });

  window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
  });

//----------------------KeyBoard Controls-------------------//
//////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////
//-=-=-=-=-=-=-=-=-=-=-Game Logic & Animations-=-=-=-=-=-=-=-=-=-=//

  Ball.prototype.update = function(playerPaddle, computerPaddle) {
    this.y += this.y_speed;
    this.x += this.x_speed;

    var ballLeft_X = this.x - 5;
    var ballLeft_Y = this.y - 5;
    var ballRight_X = this.x + 5;
    var ballRight_Y = this.y + 5;

  
    //----Ball Hitting Top/Bottom Edges----//
    if(this.y + 5 < 0) { // hitting the top wall
      this.y = 5;
      this.y_speed = -this.y_speed;} 
    else if(this.y + 5 > 450) { // hitting the bottom wall
      this.y = 445;
      this.y_speed = -this.y_speed;}

    //----Ball Hitting wall and scoring a point----//
    if(this.x < 0 || this.x > 900) {
      this.x_speed = -4;
      this.y_speed = 0;
      this.x = 450;
      this.y = 225;
    }

    //------Ball Collition Dynamics------//
    
    if(ballLeft_X < 450){// To asses which side the ball is at.
      console.log("Left hand side")

    //<<<<<<<<<<<<<<PLAYER TURN>>>>>>>>>>>>//
      if(ballLeft_X < (playerPaddle.x + playerPaddle.width)
        && ballRight_Y > playerPaddle.y
        && ballLeft_Y < (playerPaddle.y + playerPaddle.height)
        && ballRight_X > playerPaddle.x){

        // On collition
          this.x += this.x_speed;                     // Add Speed to ball
          this.x_speed = 4;                           // Change X Direction
          this.y_speed += (playerPaddle.y_speed / 2); // Change Y Direction
        }
      }

    else{
      console.log("Right hand side")

    //<<<<<<<<<<<<<<COMPUTER TURN>>>>>>>>>>>>//
      if(ballLeft_X > (computerPaddle.x + computerPaddle.width - 15)
        && ballRight_Y > computerPaddle.y
        && ballLeft_Y < (computerPaddle.y + computerPaddle.height)
        && ballRight_X > computerPaddle.x){

        // On collition
          this.x_speed = -4;                            // Change X Direction
          this.y_speed += (computerPaddle.y_speed / 2); // Change Y Direction
          this.x += this.x_speed;                       // Add Speed to ball
        }
      }
  };

  ////////////////////////////////
  //------Paddle Movements------//

  //<<Player Paddle Movements>>
  Paddle.prototype.move = function(y, x) {
    
    this.x_speed = x;
    this.y_speed = y;

    this.x += x;
    this.y += y;
    
      if(this.y < 0) { // hitting top
        this.y = 0;
        this.y_speed = 0;
      }
      else if (this.y + this.height > 450) { // hitting bottom
        this.y = 450 - this.height;
        this.y_speed = 0;
      }
    }
      
  //<<Computer Paddle Movements - (Centering)>>
  Computer.prototype.update = function(ball) {
    var y_pos = ball.y;
    var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);

    //Speed of paddle movement
      if(diff < 0 && diff < -4) { //Speed going to top
        diff = -4;
      } else if(diff > 0 && diff > 4) { //Speed going to bottom
        diff = 4;
      }
    this.paddle.move(diff, 0);

      if(this.paddle.y < 0) {
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



//----------------------Features-------------------//
/////////////////////////////////////////////////////
