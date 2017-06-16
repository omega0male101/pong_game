
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

  var render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
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
      context.fillStyle = "#0000FF";
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
          this.x_speed = 3;
          this.y_speed = 0;
          this.radius = 7;
        }

        Ball.prototype.render = function() {
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
          context.fillStyle = "#000000";
          context.fill();
        };


        // Build objects
        var player = new Player();
        var computer = new Computer();
        var ball = new Ball(450, 225);

        var render = function() {
          context.fillStyle = "#FF00FF";
          context.fillRect(0, 0, width, height);
          player.render();
          computer.render();
          ball.render();
        };
