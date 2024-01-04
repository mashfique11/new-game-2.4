var car,carImage,carImage2
var player,allPlayers
var obstacles
var background,backgroundImage,bg,bg2
var bullet,bullets
var fuel,fuelImage,fuleBox,fuelAmount,fuelBoxIcon
var life,lifeBox1,lifeBox2,lifeBox3,lifeAmount,lifeBoxIcon,lifeImage
var track
var gameState = 1
var allGameObjects,obstaclesGroup
var bullet,bulletImage,bulletGroup
var gun1,gun2,gunImage
var finishLineBlock,finishLineBlockImage
var gameDifficulty,gameDifficultyInput
var score


function preload(){
  carImage = loadImage("assets/carWar.png")
  gunImage = loadImage("assets/gun1.png")
  backgroundImage = loadImage("assets/background1.png")
  fuelImage = loadImage("assets/fuel.png")
  bulletImage = loadImage("assets/bullet.png")
  carImage2 = loadAnimation("assets/car2.png")
  finishLineBlockImage = loadImage("assets/finishline.png")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  obstaclesGroup =  new Group()

  bulletGroup = new Group()

  backGround()

  
  gameDifficulty = 1
  
  lifeBoxIcon = createImg("assets/life.png")
  lifeBoxIcon.position(50,200)
  lifeBoxIcon.size(100,100)
  lifeBoxIcon.depth = bg.depth
  lifeBoxIcon.depth += 1

  lifeBox2 = createImg("assets/life.png")
  lifeBox2.position(50,600)
  lifeBox2.size(100,100)
  lifeBox2.depth = bg.depth
  lifeBox2.depth += 1

  lifeBox3 = createImg("assets/life.png")
  lifeBox3.position(50,400)
  lifeBox3.size(100,100)
  lifeBox3.depth = bg.depth
  lifeBox3.depth += 1



  bullets = createImg("assets/shoot.png")
  bullets.position(1400,500)
  bullets.size(150,150)
  bullets.mouseClicked(gunShoot)
  
  car = createSprite(windowWidth/2,windowHeight-40,20,20)
  car.addImage("car",carImage)
  car.addAnimation("car2",carImage2)
  
  gun1 = createSprite(car.x+5,car.y,20,20)
  gun1.addImage("gun",gunImage)

  gun2 = createSprite(car.x+5,car.y,20,20)
  gun2.addImage("gun",gunImage)

  finishLineBlock = createSprite(windowWidth/2,-windowHeight*3*gameDifficulty,windowWidth + 600,50)
  finishLineBlock.addImage("finishline",finishLineBlockImage)
  finishLineBlock.scale = 4
  
  
}

function draw() {
  background("black");
   
  gun1.x = car.x + 30
  gun1.y = car.y - 30
  gun1.scale = 1.5

 

  
  gun2.x = car.x - 35
  gun2.y = car.y - 30
  gun2.scale = 1.5

  drawSprites();
  playerMovements()
  spawnObstacles()
  play()
  

  //console.log(finishLineBlock.y)
  //console.log(lifeBoxIcon.position.x)
  console.log(car.position.x)
  
}

function playerMovements(){
  if(keyIsDown(LEFT_ARROW)||keyIsDown(65)){
    car.position.x = car.position.x - 10
  }
  if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)){
    car.position.x = car.position.x + 10
  }
  if(keyIsDown(UP_ARROW)||keyIsDown(87)){
    car.position.y = car.position.y - 10
    bg.position.y = bg.position.y + 10
    bg2.position.y = bg2.position.y + 10
    finishLineBlock.y = finishLineBlock.y+10
  }
  if(keyIsDown(DOWN_ARROW)||keyIsDown(83)){
    car.position.y = car.position.y + 10
    bg.position.y = bg.position.y - 10
    bg2.position.y = bg2.position.y - 10
    finishLineBlock.y = finishLineBlock.y - 10
  }

  
}

function play(){
 camera.position.y = car.position.y

 //console.log(windowHeight)

 
 

 allGameObjects = new Group()

 

 

 if(car.y<=windowHeight/2 + 200){
  car.y = windowHeight/2+200
  background.velocitY = -10
  
 }

 if(car.isTouching(obstaclesGroup)){
  car.changeAnimation("car2")

 }

 if(bulletGroup.isTouching(obstaclesGroup)){
  obstaclesGroup.destroyEach()
 }

 if(finishLineBlock.isTouching(car)){
  console.log("you won")
  gameState = 2
 }

 if(bg.y >= 600){
  bg.y = windowHeight/2
}

if(bg2.y >= 350){
  bg2.y = windowHeight/2 - 500
}

}

function spawnObstacles(){
  if(frameCount*gameDifficulty % 60 == 0){
  var randX = Math.round(random(windowWidth - windowWidth + 400,windowWidth - 400))
  
  var randSize = Math.round(random(10,60))
  obstacles = createSprite(randX,-100,randSize,randSize)
  obstacles.velocityY = 10
  
  obstaclesGroup.add(obstacles)

  }
}

function gunShoot(){
  bullet = createSprite(car.x,car.y,50,50)
  bullet.addImage("bullet",bulletImage)
  bullet.scale = 0.1
  bullet.velocityY = -60
  
  bulletGroup.add(bullet)
}

function backGround(){
  bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  bg.addImage("background",backgroundImage)
  bg.scale = 8

  bg2 = createSprite(windowWidth/2,windowHeight/2 - 800,windowWidth,windowHeight)
  bg2.addImage("background",backgroundImage)
  bg2.scale = 8

 
}