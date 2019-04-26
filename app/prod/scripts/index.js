"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//posenet
var video;
var poseNet;
var posNetLoaded = false; //head movement coordinates 

var RightEarX;
var RightEarY;
var LeftEarX;
var LeftEarY; //ball information

var numBalls = 1;
var spring = 0.4;
var gravity = 0.06;
var friction = -1;
var balls = []; //game 

var soccerIMG;
var soccerHits = 0; //canvas settings 

var WIDTH = 720;
var HEIGHT = 480;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(0, 720), 0, random(30, 70), i, balls);
  }

  soccerIMG = loadImage("../images/soccerball.png");
  noStroke(); // callPoseNet()
}

function getCurrentPose(poses) {
  if (poses.length > 0) {
    LeftEarX = poses[0].pose.keypoints[3].position.x;
    LeftEarY = poses[0].pose.keypoints[3].position.y - 100;
    RightEarX = poses[0].pose.keypoints[4].position.x;
    RightEarY = poses[0].pose.keypoints[4].position.y - 100;
  }
}

var callPoseNet = function callPoseNet() {
  //dom video capture
  video = createCapture(VIDEO);
  video.hide(); //load poseNet api

  poseNet = ml5.poseNet(video, cbReady); //get poseNet pose 

  poseNet.on('pose', getCurrentPose);
};

function cbReady() {
  posNetLoaded = true;
}

function draw() {
  image(video, 0, 0, WIDTH, HEIGHT); //head line     

  stroke(153);
  line(LeftEarX, LeftEarY, RightEarX, RightEarY); //start game 

  if (posNetLoaded) {
    textSize(80);
    textAlign(CENTER, CENTER);
    text(soccerHits, WIDTH / 2, HEIGHT / 2);
    balls.forEach(function (ball) {
      ball.move();
      ball.display();
    });
  }
}

var Ball =
/*#__PURE__*/
function () {
  function Ball(xin, yin, din, idin, oin) {
    _classCallCheck(this, Ball);

    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  _createClass(Ball, [{
    key: "move",
    value: function move() {
      this.vy += gravity;
      this.x += this.vx;
      this.y += this.vy;

      if (lineCircle(LeftEarX, LeftEarY, RightEarX, RightEarY, this.x, this.y, this.diameter / 2)) {
        soccerHits++;
        this.vx = random(-.6, .6);
        this.vy *= -1;
      }

      if (this.x + this.diameter / 2 > width) {
        this.x = width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
      }

      if (this.y + this.diameter / 2 > height) {
        this.y = height - this.diameter / 2;
        this.vy *= friction;
      } // else if (this.y - this.diameter / 2 < 0) {
      //   this.y = this.diameter / 2;
      //   this.vy *= friction;
      // }

    }
  }, {
    key: "display",
    value: function display() {
      image(soccerIMG, this.x, this.y, this.diameter / 2, this.diameter / 2);
    }
  }]);

  return Ball;
}(); // LINE/POINT


function linePoint(x1, y1, x2, y2, px, py) {
  // get distance from the point to the two ends of the line
  d1 = dist(px, py, x1, y1);
  d2 = dist(px, py, x2, y2); // get the length of the line

  lineLen = dist(x1, y1, x2, y2); // since floats are so minutely accurate, add
  // a little buffer zone that will give collision

  buffer = 0.1; // higher # = less accurate
  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }

  return false;
} // POINT/CIRCLE


function pointCircle(px, py, cx, cy, r) {
  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  distX = px - cx;
  distY = py - cy;
  distance = sqrt(distX * distX + distY * distY); // if the distance is less than the circle's
  // radius the point is inside!

  if (distance <= r) {
    return true;
  }

  return false;
} // LINE/CIRCLE


function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  // is either end INSIDE the circle?
  // if so, return true immediately
  inside1 = pointCircle(x1, y1, cx, cy, r);
  inside2 = pointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true; // get length of the line

  distX = x1 - x2;
  distY = y1 - y2;
  len = sqrt(distX * distX + distY * distY); // get dot product of the line and circle

  dot = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / pow(len, 2); // find the closest point on the line

  closestX = x1 + dot * (x2 - x1);
  closestY = y1 + dot * (y2 - y1); // is this point actually on the line segment?
  // if so keep going, but if not, return false

  onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false; // optionally, draw a circle at the closest
  // point on the line
  // fill(255,0,0);
  // noStroke();
  // ellipse(closestX, closestY, 20, 20);
  // get distance to closest point

  distX = closestX - cx;
  distY = closestY - cy;
  distance = sqrt(distX * distX + distY * distY);

  if (distance <= r) {
    return true;
  }

  return false;
}