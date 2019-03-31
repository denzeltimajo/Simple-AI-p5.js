let population;
let polyWall;
// PVector goal  = new PVector(350, 10);

let canvasWidth = 1000
let canvasHeight = 600

let filename = 'simple'
let polyJSON = {}

var randomPoly = []
var canvasWalls = []

function preload(){

  polyJSON = loadJSON('maps/'+filename+'.json')
}

function setup() {
  // put setup code here
  createCanvas(canvasWidth, canvasHeight)

  // frameRate(20)
  angleMode(DEGREES)

  polyWall = new PolyWall(canvasWidth, canvasHeight, polyJSON)
  population = new Population(1000)

  polyWall.addWalls()
}


function draw() {
  // put drawing code here

  background(0xe0)
  // fill(0xf4, 0x43, 0x36);
  // ellipse(posX, posY, triSize);


  polyWall.renderWalls()

  population.update(polyWall.polyWalls)

  population.show()

  /**
  if (keyIsDown(81)) {
    // movementSpeed -= 0.001
    movementSpeed = 0.3
  }
  if (keyIsDown(87)) {
    // movementSpeed += 0.001
    movementSpeed = 0.5
  }
  if (keyIsDown(69)) {
    movementSpeed = 0.7
  }


  if (keyIsDown(65)) {
    // rotationSpeed -= 0.05
    rotationSpeed = 3
  }
  if (keyIsDown(83)) {
    // rotationSpeed += 0.05
    rotationSpeed = 5
  }
  if (keyIsDown(68)) {
    rotationSpeed = 7
  }

  */

  // fill(0x00)
  // text('X: ' + p1.x, 10, 30);
  // fill(0x00)
  // text('Y: ' + p1.y, 10, 60);
  
   
}
