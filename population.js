function Population(size, triLocationData){
    // Obstacle Walls = new Obstacle
    this.tris = []
    for(let i = 0; i < size; i++){
        this.tris.push(new Tri(TRI_SIZE, triLocationData))
    }
}

Population.prototype.show = function(){
    for(let i = 0; i < this.tris.length; i++){
        this.tris[i].showTri()

        // Will not process this part if both are false
        // TODO: kete REMOVE ENABLE TEST BRAIN
        if(SHOW_SIGHT_LINES || SHOW_SIGHT_DISTANCE || ENABLE_TEST_BRAIN){
            this.tris[i].showHUD()
        }
    }
}

Population.prototype.update = function(polyWalls, goalPoly){
    for(let i = 0; i < this.tris.length; i++){
        if(!this.tris[i].isDead){
            this.tris[i].move()

            this.tris[i].sight(wall_copy(polyWalls), goalPoly)

            this.tris[i].update(polyWalls, goalPoly)

            // this.tris[i].think()
        }
    }
}

function wall_copy(walls){
    let new_walls = [];
    for(let i__ = 0; i__<walls.length; i__++){
        let new_vects = []
        for(let i_ = 0; i_<walls[i__].length; i_++){
            new_vects.push(Object.assign({}, walls[i__][i_]));
        }
        new_walls.push(Object.assign([],new_vects))
    }
    return new_walls
}