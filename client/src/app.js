
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

  // //MOVE BALL!!!!
  //   var update = function() {
  //     ball.update();
  //   };

  //   Ball.prototype.update = function() {
  //     this.x += this.x_speed;
  //     this.y += this.y_speed;
  //   };


  var render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
  };
