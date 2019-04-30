class Ball {
    constructor(xin, yin, din, idin, oin) {
      this.x = xin;
      this.y = yin;
      this.vx = 0;
      this.vy = 0;
      this.diameter = din;
      this.id = idin;
      this.others = oin;
    }
  
  
  
    move() {
      this.vy += gravity;
      this.x += this.vx;
      this.y += this.vy;
  
      
      if((lineCircle(LeftEarX, LeftEarY, RightEarX, RightEarY, this.x, this.y, this.diameter /2))){
          soccerHits ++
          this.vx = random(-.6, .6)
          this.vy *= -1;
          if(this.vy > 0){
            this.vy *= -1;
          }

      }
      
      if (this.x + this.diameter / 2 > width) {
        this.x = width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
  
        this.x = this.diameter / 2;
        this.vx *= friction;
      }
      if (this.y + this.diameter / 2 > height) {
        endGame = true
        this.y = height - this.diameter / 2;
        this.vy *= friction;
      } 
  
    }
  
    display() {
      image(soccerIMG, this.x, this.y, this.diameter /2 , this.diameter /2)
  
    }
  }