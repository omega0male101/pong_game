// let update = require('./update')


/////////////////////////////////////////////////////
//------------------Starting App-------------------//

  //<<Refresh at 60 frames each second>>
  let animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
     function(callback) { window.setTimeout(callback, 1000/60) };

  //Load page using the animate method followed by our step method to update objects inside canvas

  window.onload = function() {


    //Toggle the Backgroud Audio On & Off
    let audioToggle = document.createElement('img');
      audioToggle.setAttribute("id", "audio-toggle");
      audioToggle.src = "./public/Images/volume_on.png";

      let isAudioEnabled = true;
      audioToggle.addEventListener("click", function() {
        if(isAudioEnabled) {
          audioToggle.src = "./public/Images/volume_on.png";
          audio1.play()
        }else{
          audioToggle.src = "./public/Images/volume_off.png";
          audio1.pause()
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
      
      scorePlayerDiv.innerText = "" + 0
      scoreComputerDiv.innerText = "" + 0

    animate(step);

    //Background Music
    let audio1 = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio1.play()
    audio1.volume=0.2;
  };

  let step = function() {
    update();
    render();
    animate(step);
  };

  let update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
  };

  let render = function() {
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

    let canvas = document.createElement('canvas');
    let width = 900;
    let height = 450;
      canvas.width = width;
      canvas.height = height;
      canvas.setAttribute("id", "canvas");
      canvas.fillStyle = "#000000";

    let context = canvas.getContext('2d');


  // Build objects
    let player = new Player();
    let computer = new Computer();
    let ball = new Ball(450, 225);


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
    this.x_speed = -5;
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
  for(let key in keysDown) {
    let value = Number(key);

    if(value == 38) { // 'up' arrow
      this.paddle.move(-4, 0);
    } else if (value == 40) { // 'down' arrow
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

let keysDown = {};

  window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
  });

  window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
  });

//----------------------KeyBoard Controls-------------------//
//////////////////////////////////////////////////////////////

  /////////////Sound Dependencies/////////////////
  let beep = new Audio('./public/Sounds/Boop.wav');
  let boop = new Audio('./public/Sounds/Beep.wav');
  let winner = new Audio('./public/Sounds/Tasty_Shot.wav');
  let loser = new Audio('./public/Sounds/Better_Luck.wav');

  //Score Records
  let playerScore = 0;
  let computerScore = 0;

////////////////////////////////////////////////////////////////////
//-=-=-=-=-=-=-=-=-=-=-Game Logic & Animations-=-=-=-=-=-=-=-=-=-=//

  Ball.prototype.update = function(playerPaddle, computerPaddle) {
    this.y += this.y_speed;
    this.x += this.x_speed;

    let ballLeft_X = this.x - 5;
    let ballLeft_Y = this.y - 5;
    let ballRight_X = this.x + 5;
    let ballRight_Y = this.y + 5;


    //----Ball Hitting Top/Bottom Edges----//
    if(this.y + 5 < 0) { // hitting the top wall
      this.y = 5;
      this.y_speed = -this.y_speed;} 
    else if(this.y + 5 > 450) { // hitting the bottom wall
      this.y = 445;
      this.y_speed = -this.y_speed;}


    //Scores
    if(this.x < 0) { // adding score
      computerScore += 1;
      loser.play();
      scoreComputerDiv.innerText = "" + computerScore;
      console.log('player score')
      this.x_speed = -5;
      this.y_speed = 0;
      this.x = 450;
      this.y = 225;
    }
    else if(this.x > 900) { // adding score
      
      playerScore += 1;
      winner.play();
      scorePlayerDiv.innerText = "" + playerScore;
      console.log('computer score')
      this.x_speed = -5;
      this.y_speed = 0;
      this.x = 450;
      this.y = 225;
    }

    //------Ball Collition Dynamics------//
    
    if(ballLeft_X < 450){// To asses which side the ball is at.
      // console.log("Left hand side")

    //<<<<<<<<<<<<<<PLAYER TURN>>>>>>>>>>>>//
      if(ballLeft_X < (playerPaddle.x + playerPaddle.width)
        && ballRight_Y > playerPaddle.y
        && ballLeft_Y < (playerPaddle.y + playerPaddle.height)
        && ballRight_X > playerPaddle.x){

        // On collition
          boop.play();
          this.x += this.x_speed;                     // Add Speed to ball
          this.x_speed = 4;                           // Change X Direction
          this.y_speed += (playerPaddle.y_speed / 2); // Change Y Direction
        }
      }

    else{
      // console.log("Right hand side")

    //<<<<<<<<<<<<<<COMPUTER TURN>>>>>>>>>>>>//
      if(ballLeft_X > (computerPaddle.x + computerPaddle.width - 15)
        && ballRight_Y > computerPaddle.y
        && ballLeft_Y < (computerPaddle.y + computerPaddle.height)
        && ballRight_X > computerPaddle.x){

        // On collition
          beep.play();
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
    let y_pos = ball.y;
    let diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);

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

    
 let scorePlayerDiv = document.createElement('div');
   scorePlayerDiv.setAttribute("id", "scorePlayer");

 let scoreComputerDiv = document.createElement('div');
   scoreComputerDiv.setAttribute("id", "scoreComputer");

 let canvasContainerDiv = document.createElement('div');
   canvasContainerDiv.setAttribute("id", "canvasContainer");

 let topWrapper = document.createElement('div');
   topWrapper.setAttribute("id", "top-main-wrapper");

 let bottomWrapper = document.createElement('div');
   bottomWrapper.setAttribute("id", "bottom-main-wrapper");

 let toneDiv = document.createElement('div')
  toneDiv.setAttribute("id", "tone-div");

  let toneText = document.createElement('span')
   toneText.setAttribute("id", "tone-text");
   toneText.innerText = "TOGGLE TONE"

 let audioDiv = document.createElement('div')
  audioDiv.setAttribute("id", "audio-div");

  let audioText = document.createElement('span')
   audioText.setAttribute("id", "audio-text");
   audioText.innerText = "MUTE MUSIC"

 let toneToggle = document.createElement('img');
   toneToggle.setAttribute("id", "tone-toggle");
   toneToggle.src = "./public/Images/minus.png";

    let isToneEnabled = true;

    toneToggle.addEventListener("click", function() {
      if(isToneEnabled) {
        toneToggle.src = "./public/Images/plus.png";
        boop.src = ('./public/Sounds/LowBeep.wav')
        beep.src = ('./public/Sounds/LowBoop.wav')
      }else{
        toneToggle.src = "./public/Images/minus.png";
        boop.src = ('./public/Sounds/Beep.wav')
        beep.src = ('./public/Sounds/Boop.wav')
      }
      isToneEnabled = !isToneEnabled;
    });



//----------------------Features-------------------//
/////////////////////////////////////////////////////
