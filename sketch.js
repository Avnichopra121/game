var player, obstacle1, obstacle2, obstacle3, ground;
var playerImg, obstacleImg, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img, groundImg;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload()
{
    playerImg = loadImage("player.png");
    obstacleImg = loadImage("obstacle1.png");
    obstacle2Img = loadImage("obstacle2.png");
    obstacle3Img = loadImage("obstacle3.png");
    obstacle4Img = loadImage("obstacle4.gif");
    obstacle5Img = loadImage("obstacle5.gif");
}

function setup()
{
    createCanvas(1000,1000)

    player = createSprite(200,850,5,5);
    player.addImage("player",playerImg);
    player.scale = 0.5;

    ground = createSprite(500,900,1000,10);
    ground.x = ground.width /2;

    obstaclesGroup = new Group();

}

function draw()
{
    background("black")

    if(gameState === PLAY)
    {
      ground.velocityX = -(4 + 3* score/100)
      score = score + Math.round(getFrameRate()/60);
      
       if (ground.x < 0)
       {
        ground.x = ground.width/2;
       }
      
       //jump when the space key is pressed
       if(keyDown("space")&& player.y >= 100)
       {
          player.velocityY = -12;
       }
      
       //add gravity
       player.velocityY = player.velocityY + 0.8
      
       if(obstaclesGroup.isTouching(player))
       {
          gameState = END;
       }
    }
     else if (gameState === END) 
     {     
        ground.velocityX = 0;
        player.velocityY = 0      
       
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
  
        obstaclesGroup.setVelocityXEach(0);
     }

    obstacles();

    drawSprites();
}

function obstacles()
{
    if(frameCount % 150 === 0)
    {
        var stone = createSprite(1000,900,10,10);
        stone.velocityX = -5;
        var rand = Math.round(random(1,2));
        switch(rand)
        {
            case 1: stone.addImage(obstacleImg);
            stone.scale = 0.5;
            break;
            case 2: stone.addImage(obstacle2Img);
            stone.scale = 0.2;
            break;
            case 3: stone.addImage(obstacle3Img);
            break;
            case 4: stone.addImage(obstacle4Img);
            break;
            case 5: stone.addImage(obstacle5Img);
            break;
        }

        obstaclesGroup.add(stone);
        stone.lifetime = 200;
    }
}