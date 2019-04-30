//canvas settings 
const WIDTH = 720
const HEIGHT = 480

//posenet
let video
let poseNet
let posNetLoaded = false

//head movement coordinates 
let RightEarX = WIDTH / 2 
let RightEarY = HEIGHT / 2
let LeftEarX = WIDTH / 2
let LeftEarY = HEIGHT / 2

//ball information
let numBalls = 1;
let spring = 0.6;
let gravity = 0.3;
let friction = -1;
let balls = [];

//game 
let soccerIMG 
let soccerHits = 0
let GAME = false
let endGame = false
let isBallHit = false




const startGame = (gameDifficulty) => {
  console.log('starting game ')
  GAME = !GAME
  numBalls = gameDifficulty
}

function setup() {
  
  createCanvas(WIDTH, HEIGHT);
 
  soccerIMG = loadImage(`../images/soccerball.png`)

  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random((WIDTH - (WIDTH*.6)), (WIDTH - (WIDTH*.4))),
      0,
      random(30, 70),
      i,
      balls
  );

  noStroke();
    
  callPoseNet()
}}

const getCurrentPose = (poses) => {
  if (poses.length > 0) {
    let newLeftEarX = poses[0].pose.keypoints[3].position.x;
    let newLeftEarY = poses[0].pose.keypoints[3].position.y - 150
    let newRightEarX = poses[0].pose.keypoints[4].position.x
    let newRightEarY = poses[0].pose.keypoints[4].position.y - 150;

    LeftEarX = lerp(LeftEarX, newLeftEarX, 0.2)
    LeftEarY = lerp(LeftEarY, newLeftEarY, 0.2)
    RightEarX = lerp(RightEarX, newRightEarX, 0.2)
    RightEarY = lerp(RightEarY, newRightEarY, 0.2)

  }
}

const callPoseNet = () => {
    //dom video capture
    video = createCapture(VIDEO)
    video.hide()

    //load poseNet api
    poseNet = ml5.poseNet(video, cbReady)

    //get poseNet pose 
    poseNet.on('pose', getCurrentPose)
}

const cbReady = () => {
    posNetLoaded = true 
}

function draw() {
  image(video, 0, 0, WIDTH, HEIGHT)

  if(posNetLoaded && GAME) {
    background(0)
    image(video, 0, 0, WIDTH, HEIGHT)
    

    //head line     
    stroke(153);
    line(LeftEarX, LeftEarY, RightEarX, RightEarY)

    //start game 

    if(!endGame){
      stroke(0);
      fill(255);
      textSize(80);
      text(soccerHits, WIDTH - 120, 70)
        balls.forEach(ball => {
          ball.move();
          ball.display();
        });
    }else{ 
       
    stroke(0);
    fill(255);
    textSize(80);
    textAlign(CENTER, CENTER);
    text(`Game Over`, WIDTH/2, HEIGHT/2)
    }
    }


}

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                    .exec(window.location.search);

  return (results !== null) ? results[1] || 0 : false;
}

$('load', () => {
    startGame($.urlParam('mode'))
}) 