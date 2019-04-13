let population;
let polyWall;

let filename = 'sample'
let polyJSON = {}

function preload(){
  polyJSON = loadJSON('maps/'+filename+'.json')
}

function setup() {
  // put setup code here
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

  // UNCOMMENT TO INCREASE/DECREASE FPS
  // frameRate(20)
  angleMode(DEGREES)

  polyWall = new PolyWall(CANVAS_WIDTH, CANVAS_HEIGHT, polyJSON)
  population = new Population(1)

  polyWall.addWalls()
}


function draw() {
  // put drawing code here

  background(0xe0)

  polyWall.renderWalls()

  population.update(polyWall.polyWalls, GOAL)

  population.show()

  if(!BLOCK_SCREEN){
    render_goal(GOAL)
  }
   
}

function render_goal(goalPoly){
  push()
  fill(0xff,0xf1,0x76)
  strokeWeight(0.5);
  beginShape();
  for(i=0; i < goalPoly.length; i++){
      vertex(goalPoly[i].x,goalPoly[i].y);
  }
  endShape(CLOSE);
  pop()
}