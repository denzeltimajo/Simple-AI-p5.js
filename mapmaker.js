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
    pp = line_itersection(createVector(x1,y1), createVector(x2,y2),
                     createVector(0,0), createVector(canvasWidth, canvasHeight))
    if(pp !== null){
      push()
      fill(0xff,0x00, 0x00)
      ellipse(pp.x, pp.y, 5,5)
      pop()

      let d = int(dist(x1, y1, pp.x, pp.y))
      text(d, 10, 10)
    }
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

function line_itersection(pointOneStart, pointOneEnd, pointTwoStart, pointTwoEnd) {
  let x1 = pointOneStart.x;
  let y1 = pointOneStart.y;
  let x2 = pointOneEnd.x;
  let y2 = pointOneEnd.y;
  
  let x3 = pointTwoStart.x;
  let y3 = pointTwoStart.y;
  let x4 = pointTwoEnd.x;
  let y4 = pointTwoEnd.y;
  
  let bx = x2 - x1;
  let by = y2 - y1;
  let dx = x4 - x3;
  let dy = y4 - y3;
 
  let b_dot_d_perp = bx * dy - by * dx;
 
  if(b_dot_d_perp == 0) return null;
 
  let cx = x3 - x1;
  let cy = y3 - y1;
 
  let t = (cx * dy - cy * dx) / b_dot_d_perp;
  if(t < 0 || t > 1) return null;
 
  let u = (cx * by - cy * bx) / b_dot_d_perp;
  if(u < 0 || u > 1) return null;
 
  return new createVector(x1+t*bx, y1+t*by);
}
