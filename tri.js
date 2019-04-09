function Tri(){
    //Brain class

    this.MOVEMENT_SPEED_MODES = [0.3, 0.5, 0.7]
    this.ROTATION_SPEED_MODES = [3, 5, 7]
    this.SIGHT_LENGTH = 1166

    this.triSize = 10
    this.triRotation = 0
    this.posX = 0 + (this.triSize/2)
    this.posY = Math.random() * 600

    this.movementSpeed = 0.5
    this.rotationSpeed = 5

    this.polyTri = new Array(3)
    
    this.currentTri = trianglePoints(this.triRotation, this.triSize, this.posX, this.posY)

    this.sightsDist = new Array(5)
    this.isGoal = [false, false, false, false, false]

    this.wallPoints = new Array(5)

    this.isDead = false
}

Tri.prototype.show = function(){
    this.currentTri = trianglePoints(this.triRotation, this.triSize, this.posX, this.posY)

    if(this.isDead){
        fill(0xff, 0xeb, 0x3b);
    }
    else{
        fill(0x8b, 0xc3, 0x4a);
    }

    triangle.apply(this, this.currentTri)

    for(let i=0; i < this.wallPoints.length; i++){
        if(this.wallPoints[i]){
            push()
            stroke(0x88, 0x88)
            line(this.wallPoints[i].x, this.wallPoints[i].y, this.posX, this.posY)
            pop()
            push()
            fill(0xff,0x00, 0x00)
            ellipse(this.wallPoints[i].x, this.wallPoints[i].y, 5,5)
            pop()
            
            push();
            translate((this.wallPoints[i].x + this.posX) / 2, (this.wallPoints[i].y + this.posY) / 2);
            rotate(atan2(this.posY - this.wallPoints[i].y, this.posX - this.wallPoints[i].x));
            text(nfc(this.sightsDist[i], 1), 0, -5);
            pop();
        }
    }
    
}

Tri.prototype.update = function(pWs){
    this.polyTri = [createVector(this.currentTri[0], this.currentTri[1]),
                    createVector(this.currentTri[2], this.currentTri[3]),
                    createVector(this.currentTri[4], this.currentTri[5]),
                   ]

    for(let i = 0; i < pWs.length; i++){
        this.isDead = collidePolyPoly(this.polyTri,pWs[i],true);
        if(this.isDead){
            return
        }
    }
        

}


Tri.prototype.sight = function(polyWalls){
    for(let i3 = 0; i3 < this.wallPoints.length; i3++){
        lp1x = xCirclePoint((-90 + (i3*45)) + this.triRotation, this.triSize, this.posX)
        lp1y = yCirclePoint((-90 + (i3*45)) + this.triRotation, this.triSize, this.posY)
        
        lp2x = xCirclePoint((-90 + (i3*45)) + this.triRotation - 180, this.triSize, this.posX)
        lp2y = yCirclePoint((-90 + (i3*45)) + this.triRotation - 180, this.triSize, this.posY)

        sLine = scaleLine(lp1x, lp1y, lp2x, lp2y, this.SIGHT_LENGTH)

        // line(sLine.x1, sLine.y1, this.posX, this.posY)

        let mainPoint = null
        let shortestDist = this.SIGHT_LENGTH

        for(let i1 = 0; i1 < polyWalls.length; i1++){
            let polygon = polyWalls[i1]
            let polyEdgeCount = polygon.length

            for(let i2 = 0; i2 < polyEdgeCount; i2++){
                let tempP1 = createVector(polygon[i2].x, polygon[i2].y)

                let tempP2 = createVector(polygon[(i2 + 1) % polyEdgeCount].x,
                                          polygon[(i2 + 1) % polyEdgeCount].y)
            
                let intersectPoint = lineItersection(createVector(sLine.x1, sLine.y1),
                                              createVector(this.posX, this.posY), 
                                              tempP1, tempP2)
                if(intersectPoint){
                    let d = int(dist(this.posX, this.posY, intersectPoint.x, intersectPoint.y))
                    if(shortestDist > d){
                        shortestDist = d 
                        mainPoint = intersectPoint
                    }
                }
            }

        }

        this.wallPoints[i3] = mainPoint
        this.sightsDist[i3] = shortestDist
    }
}



Tri.prototype.move = function(){
    if(!this.isDead){
        if (keyIsDown(LEFT_ARROW)) {
            this.triRotation -= this.rotationSpeed
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.triRotation += this.rotationSpeed
        }
        if (keyIsDown(UP_ARROW)) {
            
            this.posX += float(xCirclePoint(this.triRotation, this.triSize*this.movementSpeed, this.posX)) - this.posX
            this.posY += float(yCirclePoint(this.triRotation, this.triSize*this.movementSpeed, this.posY)) - this.posY
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.posX += this.posX - float(xCirclePoint(this.triRotation, this.triSize*this.movementSpeed, this.posX))
            this.posY += this.posY - float(yCirclePoint(this.triRotation, this.triSize*this.movementSpeed, this.posY))
        }
        
        // Q
        if (keyIsDown(81)) {
            this.movementSpeed = this.MOVEMENT_SPEED_MODES[0]
        }
        // W
        if (keyIsDown(87)) {
            this.movementSpeed = this.MOVEMENT_SPEED_MODES[1]
        }
        // E
        if (keyIsDown(69)) {
            this.movementSpeed = this.MOVEMENT_SPEED_MODES[2]
        }
        // A
        if (keyIsDown(65)) {
            this.rotationSpeed = this.ROTATION_SPEED_MODES[0]
        }
        // S
        if (keyIsDown(83)) {
            this.rotationSpeed = this.ROTATION_SPEED_MODES[1]
        }
        // D
        if (keyIsDown(68)) {
            this.rotationSpeed = this.ROTATION_SPEED_MODES[2]
        }
    }

}


function scaleLine(x1, y1, x2, y2, scaleFactor){
     scaleFactor = scaleFactor/5
     let xa = (x1 * (1 + scaleFactor) / 2) + (x2 * (1 - scaleFactor) / 2)
     let ya = (y1 * (1 + scaleFactor) / 2) + (y2 * (1 - scaleFactor) / 2)
     
    //  let xb = (x2 * (1 + scaleFactor) / 2) + (x1 * (1 - scaleFactor) / 2)
    //  let yb = (y2 * (1 + scaleFactor) / 2) + (y1 * (1 - scaleFactor) / 2)

    return {
        x1: xa,
        y1: ya,
        // x2: xb,
        // y2: yb,
    }
}

function lineItersection(pointOneStart, pointOneEnd, pointTwoStart, pointTwoEnd) {
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
  

function trianglePoints(tR, tS, posX, posY){
    pointsList = []
    for(i = 0; i<3; i++){
      pointsList = pointsList.concat(xCirclePoint((i*120)+tR, tS, posX),
                                     yCirclePoint((i*120)+tR, tS, posY))
    }
    return pointsList
}

function xCirclePoint(t, radds, posX){
    return (radds/2) * cos(t) + posX 
}

function yCirclePoint(t, radds, posY){
    return (radds/2) * sin(t) + posY
}