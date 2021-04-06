var oneStarMarkov = [];
var twoStarMarkov = [];
var threeStarMarkov = [];
var fourStarMarkov = [];
var fiveStarMarkov = [];
var names = ["Kory Rothfuss", 
"Anette Mccoll",  
"Amelia Spenser",  
"Jeffie Ardoin",  
"Kandace Malick",  
"Tashia Kolman",  
"Dusty Fredricks", 
"Blanche Hershman", 
"Tereasa Semien",
"Josphine Old",
"Estell Spraggins",
"Zachary Hopton",
"Renato Matheney",  
"Adrianna Nolan",  
"Maybell Overfelt",  
"Yolonda Gunther",  
"Madlyn Ballweg",  
"Hermelinda Hwang",  
"Alia Widener",  
"Lanita Mcwhite",  
"Mona Semmes",  
"Mignon Mcaninch",  
"Fatimah Betances",  
"Monte Cannaday",  
"Lewis Sorkin",  
"Guillermo Payer",  
"Mitzi Crawshaw",  
"Sun Matzen",  
"Bobbye Maxfield",  
"Rasheeda Solares",  
"Susie Manzi",  
"Albina Rathburn",  
"Olinda Ritter",
"Herschel Parman",  
"Lera Blye",  
"Latoria Summerlin",  
"Una Haydel",  
"Jules Marconi",  
"Tonette Balcom",  
"Alethea Dostal",  
"Delicia Folmar",  
"Leta Waterfield",  
"Audie Winburn",  
"Margeret Sardina",  
"Shiloh Leary",  
"Vern Gillikin",  
"Hugo Neese",  
"Martine Pilling",  
"Erma Nitti",  
"Matilda Brite",  
];

function preload() {

  oneStarMarkov = loadJSON("1star.json");
  twoStarMarkov = loadJSON("2star.json");
  threeStarMarkov = loadJSON("3star.json");
  fourStarMarkov = loadJSON("4star.json");
  fiveStarMarkov = loadJSON("5star.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  oneStarMarkov.length = 25916;
  twoStarMarkov.length = 30081;
  threeStarMarkov.length = 45751;
  fourStarMarkov.length = 42914;
  fiveStarMarkov.length = 44689;
}

function draw() {
  background("#eeeef0");
  // Title text
  textSize(32);
  text("Auto Reviews", (windowWidth/2)-40, 50);
  
  // Review container
  fill("#fafafa");
  noStroke();
  rect(20, 300, windowWidth-40, 500, 5);
  
  // User name
  thisName = names[floor(random(names.length))];
  textFont("Pontano Sans");
  textSize(30);
  fill("black");
  text(thisName, 120, 360);
  
  // User circle
  fill("red");
  circle(70, 350, 70);
  fill("white");
  textSize(50);
  text(thisName[0], 54, 366);
  
  
  // draw stars
  fill("#eeeef0");
  stroke("#ffcc00");
  star(0, 430, 15, 30, 5);
  star(60, 447, 15, 30, 5);
  star(120, 464, 15, 30, 5);
  star(180, 481, 15, 30, 5);
  star(240, 498, 15, 30, 5);
  
}

function writeReview(markov){
  // draw block to cover any old review
  
  // User name
  thisName = names[floor(random(names.length))];
  textFont("Pontano Sans");
  textSize(30);
  stroke("black");
  fill("black");
  text(thisName, 120, 360);
  
  // User circle
  fill("red");
  stroke("red");
  circle(70, 350, 70);
  fill("white");
  stroke("white");
  textSize(50);
  text(thisName[0], 54, 366);
  
  // get random length for review, between 20 - 120
  let reviewLength = floor(random(80));
  reviewLength += 20;
  var last = markov[floor(random(500))].value;
  
  stroke("black");
  fill("black");
  textFont("Georgia");
  textSize(30);
  var poem = last;
  for(var j = 1; j < reviewLength; j++){
    var nextIndex = findWithAttr(markov, "value", last);
    //print(nextIndex)
    var nextMark = markov[nextIndex].nextOptions;
    var nextWord = nextMark[floor(random(nextMark.length))];
    poem = poem + nextWord + " ";
    last = nextWord;
  }
  text(poem, 60, 460, windowWidth-120, 440);
}

// When the user clicks the mouse
function mousePressed() {
  var starSelected = 0;
  // Check if mouse is inside the first star
  let d = dist(mouseX, mouseY, 121, 412);
  if (d < 30) {
    starSelected = 1;
  }
  // Check if mouse is inside the second star
  d = dist(mouseX, mouseY, 183, 412);
  if (d < 30) {
    starSelected = 2;
  }
  // Check if mouse is inside the third star
  d = dist(mouseX, mouseY, 246, 412);
  if (d < 30) {
    starSelected = 3;
  }
  // Check if mouse is inside the fourth star
  d = dist(mouseX, mouseY, 308, 412);
  if (d < 30) {
    starSelected = 4;
  }
  // Check if mouse is inside the first star
  d = dist(mouseX, mouseY, 370, 412);
  if (d < 30) {
    starSelected = 5;
  }
  
  var newMarkov;
  if(starSelected != 0){
    // Review container
    fill("#fafafa");
    noStroke();
    rect(20, 300, windowWidth-40, 500, 5);
    
    // draw stars
    fill("#ffcc00");
    stroke("#ffcc00");
    star(0, 430, 15, 30, 5);
    if(starSelected === 1){
      fill("#eeeef0");
      newMarkov = oneStarMarkov;
    }
    star(60, 447, 15, 30, 5);
    if(starSelected === 2){
      fill("#eeeef0");
      newMarkov = twoStarMarkov;
    }
    star(120, 464, 15, 30, 5);
    if(starSelected === 3){
      fill("#eeeef0");
      newMarkov = threeStarMarkov;
    }
    star(180, 481, 15, 30, 5);
    if(starSelected === 4){
      fill("#eeeef0");
      newMarkov = fourStarMarkov;
    }
    star(240, 498, 15, 30, 5);
    if(starSelected === 5){
      newMarkov = fiveStarMarkov;
    }
    writeReview(newMarkov);
  }
    
}

//function taken from stack overflow
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1; 
}

// function taken from p5js examples
// https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  push();
  rotate(49.98);
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}