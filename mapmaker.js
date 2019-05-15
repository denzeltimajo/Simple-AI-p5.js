//example adapted from Jeffrey Thompson
let hit = false
let police = []

let polyTrigger = false
let triTrigger = false
let Trigger = false

let canvasWidth = CANVAS_WIDTH
let canvasHeight = CANVAS_HEIGHT

function setup() {
	createCanvas(canvasWidth, canvasHeight)
  collideDebug(true) //enable debug mode
  
  angleMode(DEGREES)
}

let tempMouseX
let tempMouseY

let tempPolArr = []


let triData


function draw() {
	background(0xe0);
  
  push()
  stroke(0x00,0x00,0xff);
	for(i=0; i < tempPolArr.length-1; i++){
    line(tempPolArr[i].x,tempPolArr[i].y,
         tempPolArr[i+1].x,tempPolArr[i+1].y);
  }
  pop()

  //draw the polygon from the created Vectors above.
  for(x = 0; x < police.length; x++){
    poly = police[x]
    beginShape();
    for(i=0; i < poly.length; i++){
      vertex(poly[i].x,poly[i].y);
    }
    endShape(CLOSE);
  }

  if(polyTrigger){
    let x1 = tempMouseX;
    let y1 = tempMouseY;
    let x2 = mouseX;
    let y2 = mouseY;

    ellipse(x1, y1, 7, 7);
    ellipse(x2, y2, 7, 7);

    line(x1, y1, x2, y2);
  }

  push()
  strokeWeight(0.6)
  stroke('#0005')

  fill('#0f05')
  triData = trianglePoints(-90, 10, mouseX, mouseY)
  beginShape();
    for(i=0; i < triData.length; i++){
        vertex(triData[i].x, triData[i].y);
    }
    endShape(CLOSE);
  pop()
}

function keyPressed() {
  console.log(keyCode)
  
  // SPACE
  if (keyIsDown(32)) {
    police.push(tempPolArr)
    tempPolArr = []
    polyTrigger = false
  }
  
  // DELETE or ESC
  if (keyIsDown(46) || keyIsDown(27)) {
    tempPolArr = []
    polyTrigger = false
  }
  // R
  if (keyIsDown(82)) {
    saveMapJSON()
  }

  // F5
  if (keyIsDown(116)) {
    reload()
  }

  // if (keyIsDown(90)) {
  //   // UNDO
  //   movementSpeed = 0.7
  // }

  return false; // prevent default
}


function saveMapJSON(){
  let filename = prompt("Please enter file name", "");

  if (filename == null || filename == "") {
    console.log("User cancelled the prompt.")
    return
  }

  let mapJSONData = {}

  let ppap = []

  for(let x=0; x < police.length; x++){
    let poly = police[x]
    let ppapoly = []
    for(let i=0; i < poly.length; i++){
      ppapoly.push(
          {x: poly[i].x, 
            y: poly[i].y
          });
    }
    ppap.push(ppapoly)
  }

  console.log(JSON.stringify(ppap))
  saveJSON(ppap, filename+'.json');

}


function mouseClicked() {
  polyTrigger = true
  tempPolArr.push(createVector(mouseX, mouseY))

  tempMouseX = mouseX
  tempMouseY = mouseY
}

function trianglePoints(tRotation, tSize, posX, posY){
  let pointsList = []
  for(let i = 0; i<3; i++){
    pointsList.push(createVector(xCirclePoint((i*120)+tRotation, tSize, posX),
                                 yCirclePoint((i*120)+tRotation, tSize, posY),)
                   )
  }
  return pointsList.slice(0,2)
          .concat(createVector(posX, posY))
          .concat(pointsList.slice(2))
}

function xCirclePoint(t, radds, posX){
  return (radds/2) * cos(t) + posX 
}

function yCirclePoint(t, radds, posY){
  return (radds/2) * sin(t) + posY
}