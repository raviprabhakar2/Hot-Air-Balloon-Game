var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var gameState = "play"
var score = 0

function preload() {
  bgImg = loadImage("bg.png")

  balloonImg = loadAnimation("balloon1.png", "balloon2.png", "balloon3.png")
  birdImage = loadImage("bird.png")
  coinImage = loadImage("coin.png")
}

function setup() {

  //background image
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3
  bg.x = bg.width / 2;
  bg.velocityX = -3;

  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;


  birdGroup = new Group()
  coinGroup = new Group()


}

function draw() {

  background("white");
  if (gameState == "play") {
    
    //making the hot air balloon jump
    if (keyDown("space")) {
      balloon.velocityY = -10;

    }
    //adding gravity
    balloon.velocityY = balloon.velocityY + 0.3;

    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    spawnBirds();
    spawnCoins();
    for (var i = 0; i < coinGroup.length; i++) {
      if (coinGroup.get(i).isTouching(balloon)) {
        coinGroup.get(i).remove()
        score = score + 1;
      }
    }
    if (balloon.isTouching(birdGroup)) {
      gameState = "end"
    }
    drawSprites();
  }
  if (gameState == "end") {
    fill("red")
    textSize(20)
    text("Game End", 150, 200)
  }
  fill("red")
  textSize(20)
  text("Score " + score, 300, 30)
}


function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var bird = createSprite(400, 120, 40, 10);
    bird.y = Math.round(random(80, 120));
    bird.addImage(birdImage);
    bird.scale = 0.07;
    bird.velocityX = -3;

    //assign lifetime to the variable
    bird.lifetime = 200;

    //adjust the depth
    bird.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;

    //add each cloud to the group
    birdGroup.add(bird);
  }
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 140 === 0) {
    var coin = createSprite(400, 120, 10, 10);
    coin.y = Math.round(random(120, 300));
    coin.addImage(coinImage);
    coin.scale = 0.03;
    coin.velocityX = -3;
    coin.shapeColor = "yellow"
    //assign lifetime to the variable
    coin.lifetime = 200;

    //adjust the depth
    coin.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;

    //add each cloud to the group
    coinGroup.add(coin);
  }
}