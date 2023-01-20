const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext('2d');
myCanvas.style.border = "2px solid black";

const bgImg = new Image();
bgImg.src = "../images/road.png";
const bgImg2 = new Image();
bgImg2.src = "../images/road.png";
const carImage = new Image ();
carImage.src = "../images/car.png";
let bg1Y = 0
let bg2y = -myCanvas.height;
let carX = myCanvas.width/2-15;



let isMovingLeft = false;
let isMovingRight = false;

//game variables
let gameOver = false;
let animateId;
let myObstacles = [];





window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

function animate(){
  ctx.drawImage(bgImg, 0, bg1Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2, 0, bg2y, myCanvas.width, myCanvas.height);
  ctx.drawImage(carImage, carX, 400, 30, 60);

  bg1Y += 2;
  bg2y += 2;

if (isMovingLeft === true) {
  carX -= 2
}
if (isMovingRight === true) {
  carX += 2
}

if (carX < 0) {
  carX = 0;
}
if (carX >= myCanvas.width - 30) {
  carX = myCanvas.width - 30;
}



  if(bg1Y > myCanvas.height){
    bg1Y = -myCanvas.height
  }

  if(bg2y > myCanvas.height){
    bg2y = -myCanvas.height
  }


  
  class Obstacle{
    constructor(x,y,width,height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    update(){
      const ctx = myCanvas.context;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  
    move(){
      this.y += 1;
    }
  
    left(){ return this.x}
  
    right(){ return this.x+this.width}
  
    top(){ return this.y}
  
    bottom(){ return this.y+this.height}
  }
  
  function updateObstacles() {
    myCanvas.frames++;
    if(myCanvas.frames % 120 == 0){
      let minWidth = 80;
        let maxWidth = 160;
        let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
        let x = Math.floor(Math.random()*(canvas.width-maxWidth-4));
        myObstacles.push(new Obstacle(x,0,width,20));
    }
  
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].y += 2;
      myObstacles[i].update();
    }
  }


if(!gameOver){
  animateId = requestAnimationFrame(animate);
}else{
  cancelAnimationFrame(animateId)
}
}

  function startGame() {
    animate();
    console.log('Game started');
  }
};


document.addEventListener('keypress', event => {
  console.log(event);
  if (event.key === 'a') {
    // move car to the left
    isMovingLeft = true
  }
  if (event.key === 'd') {
    // move car to the right
    isMovingRight = true
  }
 
})

document.addEventListener('keyup', (event) => {
  // Making the car stop
  
  isMovingLeft = false
  isMovingRight = false

})

