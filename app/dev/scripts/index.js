
//posenet
let video
let poseNet
let posNetLoaded = false

//head movement coordinates 
let RightEarX
let RightEarY 
let LeftEarX
let LeftEarY

//ball information
let numBalls = 1;
let spring = 0.4;
let gravity = 0.06;
let friction = -1;
let balls = [];

//game 
let soccerIMG 
let soccerHits = 0
let GAME = false
let endGame = false

//canvas settings 
const WIDTH = 720
const HEIGHT = 480




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
      random(WIDTH),
      0,
      random(30, 70),
      i,
      balls
  );

  noStroke();
    
  callPoseNet()
}}

const getCurrentPose = (poses) => {
    if (poses.length > 0 ){
        LeftEarX = poses[0].pose.keypoints[3].position.x
        LeftEarY = poses[0].pose.keypoints[3].position.y - 100
        RightEarX = poses[0].pose.keypoints[4].position.x
        RightEarY = poses[0].pose.keypoints[4].position.y - 100
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
    
    
    stroke(0);
    fill(255);
    textSize(80);
    text(soccerHits, WIDTH - 120, 70)
    if(!endGame){
      balls.forEach(ball => {
        ball.move();
        ball.display();
      });
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