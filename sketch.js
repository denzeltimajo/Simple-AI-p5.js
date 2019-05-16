let population;
let polyWall;

let filename = 'est'
let polyJSON = {}

let goalArea

function preload(){
  polyJSON = loadJSON('maps/'+filename+'.json')
}

function setup() {
  // put setup code here
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

  // UNCOMMENT TO INCREASE/DECREASE FPS
  // frameRate(2000)
  angleMode(DEGREES)

  goalArea = polyJSON.g

  polyWall = new PolyWall(CANVAS_WIDTH, CANVAS_HEIGHT, polyJSON.p)
  population = new Population(1, polyJSON.tri)

  polyWall.addWalls()
}


function draw() {
  // put drawing code here

  background(0xe0)

  polyWall.renderWalls()

  population.update(polyWall.polyWalls, goalArea)

  population.show()

  if(BLOCK_SCREEN){
    beginShape()
    fill(0)
    vertex(CANVAS_WIDTH,CANVAS_HEIGHT);
    vertex(0,CANVAS_HEIGHT);
    vertex(0,0);
    vertex(CANVAS_WIDTH,0);
    endShape(CLOSE)
  } else {
    render_goal(goalArea)
  }
  
}

function render_goal(goalPoly){
  push()
  fill(0xff,0xf1,0x76)
  strokeWeight(0.5);
  beginShape();
  for(i=0; i < goalPoly.length; i++){
      vertex(goalPoly[i].x, goalPoly[i].y);
  }
  endShape(CLOSE);
  pop()
}