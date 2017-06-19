
//Refresh at 60 frames each second
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };


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
  window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };

  var step = function() {
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

  Paddle.prototype.render = function() {
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
    Player.prototype.render = function() {
      this.paddle.render();
    };

    Computer.prototype.render = function() {
      this.paddle.render();
    };


    // Create Ball

      function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = -3;
        this.y_speed = 0;
        this.radius = 9;
      }

      Ball.prototype.render = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
      };


      // Build objects
      var player = new Player();
      var computer = new Computer();
      var ball = new Ball(450, 225);

      var render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        player.render();
        computer.render();
        ball.render();
      };

      ////////////////////////////////////////////////////////////
      ///////////////////////ANIMATIONS///////////////////////////
      ////////////////////////////////////////////////////////////

      // var width = 400;      x   / 900
      // var height = 600;    y    / 450
      


      var update = function() {
        player.update();
        computer.update(ball);
        ball.update(player.paddle, computer.paddle);
      };

      Ball.prototype.update = function(playerPaddle, computerPaddle) {
        this.y += this.y_speed;
        this.x += this.x_speed;

        var left_x = this.x - 5;
        var left_y = this.y - 5;
        var right_x = this.x + 5;
        var right_y = this.y + 5;

          //Hitting Top/Bottom Edges..
          if(this.y + 5 < 0) { // hitting the top wall
            this.y = 5;
            this.y_speed = -this.y_speed;

          } else if(this.y + 5 > 450) { // hitting the bottom wall
            this.y = 445;
            this.y_speed = -this.y_speed;
          }

          //Hitting wall and scoring a point
          if(this.x < 0 || this.x > 900) {
            this.x_speed = -3;
            this.y_speed = 0;
            this.x = 450;
            this.y = 225;
          }


          //Paddle Dynamics
          //----Computer Paddle
        if(left_y > 225) {
          if(left_y < (computerPaddle.y + computerPaddle.height)
            && right_y > computerPaddle.y
            && left_x < (computerPaddle.x + computerPaddle.width)
            && right_x > computerPaddle.x)
          {
            // hit the computer's paddle
            this.y_speed = +3;
            this.x_speed += (computerPaddle.x_speed / 2);
            this.y += this.y_speed;
          }

          //Player Paddle
        } else {
          if(left_x < (playerPaddle.x + playerPaddle.width)
            && right_y > playerPaddle.y
            && left_y < (playerPaddle.y + playerPaddle.height)
            && right_x > playerPaddle.x) 
          {
            // hit the player's paddle
            this.x += this.x_speed;
            this.x_speed = +3;
            this.y_speed += (playerPaddle.y_speed / 2);
            
          }
        }
      };

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


        //Computer following center of the ball..
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
          } else if (this.paddle.y + this.paddle.height > 900) {
            this.paddle.y = 900 - this.paddle.height;
          }
        };



      ////////////////////keys///////////////////////////

      //Mapping keyboard keys to player
      Player.prototype.update = function() {
        for(var key in keysDown) {
          var value = Number(key);

          if(value == 38) { // up arrow
            this.paddle.move(-4, 0);
          } else if (value == 40) { // down arrow
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
