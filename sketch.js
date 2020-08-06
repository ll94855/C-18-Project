//Global Variables
var monkey, monkey_running, stoneObstacle, stone_image, scene1, scene2, jungle_image, bananaFood, banana_image, gameOver, gameOver_image, restart, restart_image, ground, ground_image;

var bananaGroup;

var stoneGroup;

var score = 0;

var PLAY = 1;
var END = 0;

var lives = 2;

var gameState = PLAY;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  stone_image = loadImage("stone.png");
  
  jungle_image = loadImage("jungle.png");
  
  //ground_image = loadImage("ground.png");
  
  banana_image = loadImage("banana.png");
  
  //restart_image = loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  
  bananaGroup = createGroup();
  stoneGroup = createGroup();
  
  scene1 = createSprite(World.width/2,World.height/2,World.width,World.height);
  scene1.addImage("jungle_img",jungle_image);
  scene1.scale=5
  scene1.velocityX = -5;
  
  scene2 = createSprite(World.width+World.width/2,World.height/2,World.width,World.height);
  scene2.addImage("jungle_img",jungle_image);
  scene2.scale=5
  scene2.velocityX = -5;
  
  ground = createSprite(300,280,600,20);
  
  monkey = createSprite(200,240,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  
}

function sceneLoop() 
  {
    if(scene1.x <= World.width-World.width-World.width/2) 
    {
    scene1.x = World.width+World.width/2;
    }
    
    if(scene2.x <= World.width-World.width-World.width/2) 
    {
      scene2.x = World.width+World.width/2;
    }
  }


function banana()
  {
    if(World.frameCount % 80 === 0)
      {
        var bananaFood = createSprite(700,random(100,200),10,10);
        bananaFood.addImage("banana",banana_image);
        
        console.log(bananaFood.y);
        bananaFood.scale = 0.05;
        
        bananaFood.velocityX = -5;
        
        bananaFood.lifetime = 300;
        
        bananaGroup.add(bananaFood);
      }
  }

function stone()
  {
    if(World.frameCount % 300 === 0)
      {
        var stoneObstacle = createSprite(700,250);
        stoneObstacle.addImage("stone",stone_image);
        stoneObstacle.scale = 0.25;
        
        stoneObstacle.velocityX = -5;
        
        stoneGroup.add(stoneObstacle);
      }
  }


function eatOrLose()
  {
    if(monkey.isTouching(bananaGroup) || monkey.isTouching(stoneGroup))
      {
        if(monkey.isTouching(bananaGroup))
          {
            score = score+1;
            bananaGroup.destroyEach();
          }
        else
          {
            lives = lives-1;
            if(lives === 1)
            {
            stoneGroup.destroyEach();
              
            score = 0;
            }
            else if(lives === 0)
            {
            gameState = 0;
            }
            
          }
      }
  }

function scoring()
{
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default: break;
  }  
}

function controls()
{
  if(keyDown("space")&& monkey.y>=229)
  {
    monkey.velocityY = -15;
  }
    monkey.velocityY = monkey.velocityY+0.6;
  
    monkey.collide(ground);
}

function draw(){
 background(255); 
drawSprites();
  
  if(gameState === PLAY)
  {
  
  controls();
  
  banana();

  eatOrLose();
  
  stone();
    
  scoring();
  }
  else if(gameState === END)
  {
  
  ground.velocityX = 0;
  scene1.velocityX = 0;
  scene2.velocityX = 0;
    
  bananaGroup.setVelocityXEach(0);
  stoneGroup.setVelocityXEach(0);
  bananaGroup.lifetime =-1
  stoneGroup.lifetime =-1;
  
  fill("red");
  stroke("red");
  text("YOU LOSE",250,150);
  }
  
  fill("white");
  stroke("white");
  text(score,500,100);
  
  
  
  
  
  sceneLoop();
}