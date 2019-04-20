function PolyWall(cW, cH, polyJSON){
    this.polyJSON = polyJSON

    this.polyWalls = [
        // NOTE: SET FORLOOP TO INDEX 1 SO THIS ISNT DRAWN
        [
            createVector(0, 0),
            createVector(cW, 0),
            createVector(cW, cH),
            createVector(0, cH),
        ],
    ]
}

PolyWall.prototype.renderWalls = function() {
    fill(0xff);
    for(x=1; x < this.polyWalls.length; x++){
        poly = this.polyWalls[x]
        beginShape();
        for(i=0; i < poly.length; i++){
            vertex(poly[i].x, poly[i].y);
        }
        endShape(CLOSE);
    }
}

PolyWall.prototype.addWalls = function() {
    json = this.polyJSON

    for(x=0; x < Object.keys(json).length; x++){
        var jsn = json[x]
        var polwal = []
        for(i=0; i < jsn.length; i++){
            polwal.push(createVector(jsn[i].x,jsn[i].y))
        }
        this.polyWalls.push(polwal)
    }

    
    console.log(this.polyWalls)
}
