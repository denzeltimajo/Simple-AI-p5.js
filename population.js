function Population(size){
    // Obstacle Walls = new Obstacle
    this.tris = []
    for(let i = 0; i < size; i++){
        this.tris.push(new Tri())
    }
}

Population.prototype.show = function(){
    for(let i = 0; i < this.tris.length; i++){
        this.tris[i].show()
    }
}

Population.prototype.update = function(polyWalls){
    for(let i = 0; i < this.tris.length; i++){
        this.tris[i].move()
    
        this.tris[i].update(polyWalls)
    }
}