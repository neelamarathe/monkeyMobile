var fruitS = 0;

var back,backI;

var monkey , monkey_running,monkeyI;

var invisible,invisible2;

var  obstacle, obstacleI;

var fruits,fruit1,fruit2; 

var fruitG, obstacleG;

var over, overI;
var res,resimg;
var score;

var gameState = "play";

var end;

var funnyB;

var r;

function preload(){
  
  monkey_running =loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
 // monkey_stop=loadImage();
  backI = loadImage("back3.jpg");
  
  obstaceImage = loadImage("obstacle.png");
  
  fruit1 = loadImage("apple.png");
  
  fruit2 = loadImage("banana.png")
  
  overI = loadImage("gameover[1].png");
  
  funnyB = loadSound("funny.mp3");
resimg = loadImage("restart.png");
}

function setup() {
   createCanvas(700,400);
   
   
  back = createSprite(500,130,400,270);
  back.addImage(backI);
  back.velocityX = -6;
  back.scale = 2;
  monkey=createSprite(80,200,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.11;
  
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,0,400,500)
  
  invisible = createSprite(250,338,500,10);
  invisible.visible =false;
  
  invisible2 = createSprite(250,10,500,1);
  invisible2.visible = false;
  res = createSprite(300,200,10,10);
  res.addImage(resimg);
  res.scale = 0.7;
  // score variables and groups
  obstacleGroup = new Group();
  fruitG = new Group();
   over = createSprite(250,140,10,10);
       over.addImage(overI);
       over.scale = 1;
  score = 0;
  funnyB.loop();
  
}
function draw() {
  background("lightblue");
   
  if(gameState === "play"){
    res.visible = false;
    over.visible = false
    if(frameCount % 5 === 0){
       score += 5;
    }
  
    if(back.x<0){
       back.x=back.width/2;    
    }
      
    back.velocityX = -(6+1* score/100);       
    
    if(touches.length>0 || keyDown("space")&&monkey.y >=169) {
       monkey.velocityY = -14;
       }
  
    if(fruitG.isTouching(monkey)){
       fruitS = fruitS + 1;
       fruitG.destroyEach();
       monkey.scale+= 0.007;
    }
  
    if(monkey.isTouching(obstacleGroup)){
       gameState = end;
    }
    
    if(monkey.scale < 0.07){
       gameState = end;
    }
      
    monkey.velocityY = monkey.velocityY + 0.8;
     obstacles();
    spawnFruit();
    monkey.collide(invisible);
    monkey.collide(invisible2);
  }
  
 else if(gameState === end){
   res.visible = true;
   over.visible = true;
       back.velocityX = 0;
       monkey.velocityY = 0;
   monkey.visible=false;
       obstacleGroup.destroyEach();
       fruitG.destroyEach();
       funnyB.stop();
       obstacleGroup.setVelocityXEach(0);
       fruitG.setVelocityXEach(0);
      
   if(mousePressedOver(res)){
     reset();
   }
  }  
 drawSprites();

  stroke("black");
  strokeWeight(5)
  textSize(15);
  fill("aqua");
  text("score:"+ score, 380,50);
  text("fruits:" + fruitS,300,50)
}
function reset(){
 // console.log("hi")
  gameState = "play";
  funnyB.play();
  score = 0;
  fruitS = 0;
       back.velocityX = -6;
  over.visible = false;
  monkey.visible = true;
  res.visible = false;
}
function spawnFruit(){
  if(frameCount % 100 === 0){
    r = Math.round(random(1,2));
    var fruits = createSprite(500,200,10,10);
    fruits.y = Math.round(random(50,200))
    fruits.velocityX = -(12+1*score/100);
    fruits.scale = 0.1;
    fruitG.add(fruits);
    if(r === 1){
       fruits.addImage(fruit1);
    }
    if(r === 2){
       fruits.addImage(fruit2);
    } 
 }
}

function obstacles(){
 if(frameCount % 70 === 0){
    obstacle = createSprite(700,300,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -(6+1*score/100);
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
   
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200);
 }
}