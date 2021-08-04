var bg, WBC, gameOverI, gameOver, witch;
var bckg, wbc ,cry, merman;
var fish, crab, squid, fishes, krab, octupus;
var pearl, wiggle ,arp, oyster, boys, son;
var beginOver, begin, baby;

var PLAY=2;
var START=1;
var END=0;
var gameState=START;

var distance=0;

function preload(){
  bckg = loadImage("Photos/background.PNG");
  WBC = loadAnimation("Photos/wbc 1.PNG","Photos/wbc 2.PNG","Photos/wbc 4.PNG", "Photos/wbc 3.PNG");
  cry = loadAnimation("Photos/merman6.PNG");
  krab = loadAnimation("Photos/Villain 2.PNG");
  octupus = loadAnimation("Photos/Villain 1.PNG");
  gameOverI = loadAnimation("Photos/gameOver.png");
  beginOver = loadImage("Photos/Restart.PNG");
  oyster = loadAnimation("Photos/RBC.PNG");
  boys = loadAnimation("Photos/Platlets.PNG");
  son = loadAnimation("Photos/T Cell.PNG");
  merman = loadAnimation("Photos/merman5.PNG");
  fishes = loadAnimation("Photos/Macrophage.PNG");
}

function setup(){
  
createCanvas(900,700);
  
// Moving background
bg =createSprite(800,350);
bg.addImage(bckg);
bg.velocityX = (6 + 2*distance/150);
bg.scale = 20;

//creating boy running
 wbc = createSprite(270,550,50,70);
wbc.addAnimation("White Blood Cell",WBC);
wbc.scale=0.5;
wbc.setCollider("rectangle",0,0,wbc.width,wbc.height);
  
   gameOver = createSprite(450,100);
    gameOver.addAnimation("The End", gameOverI);
    //gameOver.scale = 0.5;
    
     begin = createSprite(430,650);
    begin.addAnimation("ReStart",beginOver);
   begin.scale = 2;
  
  witch = createSprite(700,220);
    witch.addAnimation("Witch", merman);
    witch.scale=0.7;
  
  baby = createSprite(400,400);
    baby.addAnimation("Cry Baby",cry);
   baby.scale = 1.2;
  
  pearl = createGroup();
  wiggle = createGroup();
  arp = createGroup();
  fish = createGroup();
  crab = createGroup();
  squid = createGroup();
}

function draw() {
  background(0);
  
  if(gameState===START)
  {
    //Bakcground of start state
    background("#8C001A");
    
    //Assigning visibility false to all sprites
    gameOver.visible = false;
    begin.visible = false;
    wbc.visible = false;
    pearl.visible = false;
    wiggle.visible = false;
    arp.visible = false;
    fish.visible = false;
    crab.visible = false;
    squid.visible = false;
    bg.visible = false;
    witch.visible = true;
    baby.visible = false;
    
    //To declare instructions
    textSize(23);
    fill("#7FFFD4");
    text("Kappa is a merman who is involved in many",50,110);
    text("prophecies. He is believed to be a guiding ",50,150);
    text("light for others who will lead them to a bright",50,190);
    text(",prosperous future. But people forget that he is ",50,220);
    text("one of their kind too, a merfolk with desires ",50,260);
    text("and emotions. He wishes to leave all of this ",50,300);
    text("and shine for himself, live a life for himself",50,340);
    text("and not for others. However, he is cursed to ",50,380);
    text("shine for others. Feeling helpless, lost and",50,420);
    text("insecure, he tries to swim upwards to meet the God",50,460);
    text("of the Surface, Creator of his world and all life within it",50,500);
    textSize(25);
    fill("#64E986")
    text("Help him reach up the surface.",50,550);
    textSize(40);
    fill("#F433FF")
    text("ALL THE BEST!",300,600);
    fill("#FFD801");
    textSize(28);
    text("Press Space Key to Start the Game",250,650);
    
    //To start the game when space key is presses
    if(keyDown("space"))
    {
      gameState=PLAY; 
    }
  }else if(gameState===PLAY){
  gameOver.visible = false;
 begin.visible = false;
    bg.visible = true;
    wbc.visible = true;
    witch.visible = false; 
    baby.visible = false;
    
   wbc.y = World.mouseY;
   distance = distance + Math.round(getFrameRate()/50);
  
   edges= createEdgeSprites();
   wbc.collide(edges);
    if(bg.y > height ){
    bg.y = height/2;
  }
    
  var obstacles = Math.round(random(1,2));
  
  if(World.frameCount % 150 == 0) {
    if(obstacles == 1){
      aquatic();
    } else if(obstacles == 2){
    clam();
  }
  }
    
    var obStacles = Math.round(random(1,2));
  
  if(World.frameCount % 200 == 0) {
    if(obStacles == 1){
    grass();
    } else if(obStacles == 2){
    eel();
  }
  }
    
    var obstaCles = Math.round(random(1,2));
  
  if(World.frameCount % 250 == 0) {
    if(obstaCles == 1){
      small();
    } else if(obstaCles == 2){
    siren();
  }
  }
    
    if(pearl.isTouching(wbc) || wiggle.isTouching(wbc) || arp.isTouching(wbc) || crab.isTouching(wbc) || squid.isTouching(wbc)){
    gameState = END;
  }
  }
  else if(gameState === END){
    bg.velocityX = 0;
    wbc.visible = false;
    witch.visible = false;
    baby.visible = true;
    
    pearl.setVelocityXEach(0);
    pearl.setLifetimeEach(-1);
    pearl.destroyEach();
    
    wiggle.setVelocityXEach(0);
    wiggle.setLifetimeEach(-1);
    wiggle.destroyEach();
    
    if(bg.y > height ){
    bg.y = height/2;
  }
    
    arp.setVelocityXEach(0);
    arp.setLifetimeEach(-1);
    arp.destroyEach();
    
    fish.setVelocityXEach(0);
    fish.setLifetimeEach(-1);
    
    crab.setVelocityXEach(0);
    crab.setLifetimeEach(-1);
    
    squid.setVelocityXEach(0);
    squid.setLifetimeEach(-1);
    
    fish.destroyEach();
    crab.destroyEach();
    squid.destroyEach();
    
  gameOver.visible = true;
  begin.visible = true;
    
    if(keyDown(UP_ARROW)){
      reset();
    }
  }

  drawSprites();
  textSize(30);
  fill(255);
  text("Distance: "+ distance,350,30);
}

 function clam(){
   var shellfish = createSprite(Math.round(100,800),100);
    shellfish.addAnimation("Pearl",oyster);
    shellfish.scale = 0.3;
    shellfish.setLifetime = 400;
    shellfish.velocityY = (6 + 2*distance/150);

    pearl.add(shellfish);
  }

function grass(){
   var algae = createSprite(800,Math.round(100,500));
    algae.addAnimation("Wiggle Boys",boys);
    algae.scale = 0.3;
    algae.setLifetime = 400;
    algae.velocityX = -(4 + 2*distance/150);
   algae.velocityY = (6 + 2*distance/150);
  
    wiggle.add(algae);
  }

function siren() {
   var shark = createSprite(50,Math.round(100,550));
    shark.addAnimation("Kappa and Siren's",son);
    shark.scale = 0.7;
    shark.setLifetime = 400;
    shark.velocityX = (6 + 2*distance/150);
   shark.velocityY = (4 + 2*distance/150);
 
    arp.add(shark);
  }

function reset() {
  gameState = PLAY;
distance=0;
 wbc.visible = true;
 gameOver.visible = false;
 begin.visible = false;
 bg.visible = true;
  baby.visible = false;
 bg.velocityY = (6 + 2*distance/150);
  distance = distance + Math.round(getFrameRate()/50);
}

function small () {
   var friends = createSprite(450,Math.round(100,550));
    friends.addAnimation("Kappa's companions",fishes);
    friends.scale = 2;
    friends.setLifetime = 400;
    friends.velocityY = -(6 + 2*distance/150);
 
    fish.add(friends);
  }

function aquatic () {
   var animal = createSprite(Math.round(100,800),100);
    animal.addAnimation("Mr. CKrab",krab);
    animal.scale = 0.3;
    animal.setLifetime = 400;
    animal.velocityX = (6 + 2*distance/150);
 
    crab.add(animal);
  }

function eel () {
   var jellyfish = createSprite(Math.round(100,800),100);
    jellyfish.addAnimation("Jelly Fish",octupus);
    jellyfish.scale = 0.3;
    jellyfish.setLifetime = 400;
    jellyfish.velocityX = (6 + 2*distance/150);
 
    squid.add(jellyfish);
  }