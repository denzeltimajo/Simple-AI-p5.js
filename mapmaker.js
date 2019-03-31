//example adapted from Jeffrey Thompson
var hit = false
var police = []
var polyTrigger = false

let canvasWidth = 1000
let canvasHeight = 600

function setup() {
	createCanvas(canvasWidth, canvasHeight)
	collideDebug(true) //enable debug mode
}

var tempMouseX
var tempMouseY

var tempPolArr = []

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

}

function keyPressed() {
  console.log(keyCode)
  
  if (keyIsDown(32)) {
    police.push(tempPolArr)
    tempPolArr = []
    polyTrigger = false
  }
  if (keyIsDown(46)) {
    tempPolArr = []
    polyTrigger = false
  }
  if (keyIsDown(82)) {
    filename = prompt("Please enter file name", "");

    if (filename == null || filename == "") {
      console.log("User cancelled the prompt.")
    }
    else{
      ppap = []

      for(x=0; x < police.length; x++){
        poly = police[x]
        ppapoly = []
        for(i=0; i < poly.length; i++){
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
  }
  if (keyIsDown(116)) {
    reload()
  }
  // if (keyIsDown(90)) {
  //   // UNDO
  //   movementSpeed = 0.7
  // }

  return false; // prevent default
}

function mouseClicked() {
  polyTrigger = true
  tempPolArr.push(createVector(mouseX, mouseY))

  tempMouseX = mouseX
  tempMouseY = mouseY
}