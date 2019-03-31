function Tri(){
    //Brain class

    this.triSize = 10
    this.triRotation = 0
    this.posX = 0 + (this.triSize/2)
    this.posY = Math.random() * 600

    this.MOVEMENT_SPEED_MODES = [0.3, 0.5, 0.7]
    this.ROTATION_SPEED_MODES = [3, 5, 7]

    this.movementSpeed = 0.5
    this.rotationSpeed = 5

    this.polyTri = new Array(3)
    
    this.currentTri = trianglePoints(this.triRotation, this.triSize, this.posX, this.posY)

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
            this.posX += this.posX - float(xCirclePoint(0+this.triRotation, this.triSize*this.movementSpeed, this.posX))
            this.posY += this.posY - float(yCirclePoint(0+this.triRotation, this.triSize*this.movementSpeed, this.posY))
        }    
    }
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