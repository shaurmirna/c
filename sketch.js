

var dog;
var happyDog;
var database;
var foods;
var foodStok;
var dogImage;
var dogImage2;
var fedTime, lastFed;
var foodObj ;
var foodStock
function preload()
{
  dogImage = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
  database= firebase.database();
  createCanvas(800, 600);
  
  dog = createSprite(600,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2;

var foodStok=database.ref('food');
  foodStok.on("value",readStok);

var feed = createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

var addFood = createButton("add food ");
addFood.position(800,95);
addFood.mousePressed(addFoods);


 
}


function draw() {  
  background(46,139,87);
 
 
 

  drawSprites();
  
  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFeed=data.val();
  })
  
  textSize(20)
  fill("white")
 if(lastFed>=12){
   text("lastFeed :  "+lastFed%12+"PM",350,30)
}else if(lastFed==0){
  text("lastfeed : 12 AM",350,30)
}else{
  text("lastFeed : " + lastFed+"AM",350,30)
}

 
}

function readStok(data){
foods=data.val();
}

function writeStok(x){
  if(x<=0){
 x=0;
  }
  else{
 x=x-1;
  }
  database.ref('/').update({
    food:x
  })
  }


  function feedDog(){
    dog.addImage(dogImage2);

    foodObj.updateFoodStock(foodObj. getFoodStock()-1);
    database.ref('/').update({
      food:foodObj. getFoodStock(),
      feedTime:hour()
    });
  }

  function addFoods(){
foods++
database.ref('/').update({
  food:foods
})
  }
