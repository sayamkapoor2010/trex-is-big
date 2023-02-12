var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds
var obstacle1, obstacle2, obstacle3, obstacle3, obstacle4, obstacle5, obstacle6, obstacles
var obstacles_group
var clouds_group
var PLAY = 1
var END = 0
var game_State = PLAY
var score
var gameOver, restart, gameOverImg, restartImg
var jumpsound, diesound, checkpointsound


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  cloudImage = loadImage("cloud.png")

  gameOverImg = loadImage("gameOver.png")

  restartImg = loadImage("restart.png")

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  

  groundImage = loadImage("ground2.png")

  jumpsound = loadSound("jump.mp3")

  diesound = loadSound("die.mp3")

}




function setup() {
  createCanvas(600,200);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  //var ran = Math.round (random(1, 6))

//console.log(ran)


  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

 trex.setCollider("Circle",0,0,40)
 
 
  trex.debug  = false

  trex.addAnimation("collided", trex_collided)
  
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(4 + 3* score/100)
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

   obstacles_group = new Group() 

   clouds_group = new Group()
  
}

function draw() {
  //set background color
  background(150);

  text("Score: "+ score, 500,50);
  
  //console.log(trex.y)

  if(game_State===PLAY) {

     //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 100) {
    trex.velocityY = -10;
   jumpsound.play()
  }
  if(score>0 && score%100 === 0)
  { checkPointSound.play() }
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  //scoring
   score = score + Math.round(frameCount/60)

   
  spawnClouds()

  spawnObstacles()

  gameOver.visible = false

  restart.visible = false
  
if(obstacles_group.isTouching(trex)) {

  game_State=END

  diesound.play
}



  }

  else if(game_State===END) {

    ground.velocityX = 0

    obstacles_group.setVelocityXEach(0)

    clouds_group.setVelocityXEach(0)

    trex.changeAnimation("collided", trex_collided) 

    gameOver.visible = true

    restart.visible = true

    
    obstacles_group.setLifetimeEach (-1);
clouds_group.setLifetimeEach(-1)
trex.velocityY = 0

    }

    
  
  
  
  
 //stop trex from falling down
 trex.collide(invisibleGround);
  
  
  drawSprites();
}



function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime =250
    //console.log("hello"+"world")

    //adjust the depth
   cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    clouds_group.add(cloud)

    }


  }



  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/200);
        
       //obstacle.velocityX = -6
      
       // //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         case 4: obstacle.addImage(obstacle4);
                 break;
         case 5: obstacle.addImage(obstacle5);
                 break;
         case 6: obstacle.addImage(obstacle6);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 400;


       obstacles_group.add(obstacle)
    }
   }