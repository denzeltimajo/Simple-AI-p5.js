let population;
let polyWall;
// goal is now a polygon

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
  population = new Population(1)

  polyWall.addWalls()
}


function draw() {
  // put drawing code here

  background(0xe0)

  polyWall.renderWalls()

  population.update(polyWall.polyWalls)

  population.show()

  // fill(0x00)
  // text('X: ' + p1.x, 10, 30);
  // fill(0x00)
  // text('Y: ' + p1.y, 10, 60);
  
   
}
