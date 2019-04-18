// TODO: kete DO BRAIN
let TRUE_MOUSE_PRESS = false
function Brain(){

    this.xPoints = []
    this.yPoints = []

    this.a = tf.variable(tf.scalar(random(-1, 1)))
    this.b = tf.variable(tf.scalar(random(-1, 1)))
    this.c = tf.variable(tf.scalar(random(-1, 1)))
    this.d = tf.variable(tf.scalar(random(-1, 1)))

    this.learningRate = 0.03;
    this.optimizer = tf.train.adam(this.learningRate);

    console.log("m:"+this.m+";b:"+this.b)
}

Brain.prototype.predict = function(xPoints){
    return tf.tidy(() => {
        const xPs = tf.tensor1d(xPoints)
        // y = ax^3 + bx^2 + cx + d
        const yPS = xPs.mul(this.a).pow(3)
                    .add(xPs.mul(this.b).square())
                    .add(xPs.mul(this.c))
                    .add(this.d)
                    
        return yPS
    })
}

Brain.prototype.loss = function(pred, label){
    return pred.sub(label).square().mean()
}

ON_TRAINING = false

Brain.prototype.test = function(sights){
    if(TRUE_MOUSE_PRESS){
        let xPt = map(mouseX, 0, width, -1, 1)
        let yPt = map(mouseY, 0, height, 1, -1)

        this.xPoints.push(xPt)
        this.yPoints.push(yPt)

        TRUE_MOUSE_PRESS = false
    }

    push()
    stroke(255)
    strokeWeight(6)
    for(let i = 0; i<this.xPoints.length; i++){
        let xPt = map(this.xPoints[i], -1, 1, 0, width)
        let yPt = map(this.yPoints[i], -1, 1, height, 0)
        point(xPt, yPt)
    }
    pop()

    if(this.xPoints.length>0 && ON_TRAINING){
        this.optimizer.minimize(() => this.loss(this.predict(this.xPoints), tf.tensor1d(this.yPoints)))
    }


    const curveX = [];
    for (let x = -1; x <= 1.05; x += 0.05) {
        curveX.push(x);
    }

    const ys = this.predict(curveX);
    let curveY = ys.dataSync();
    ys.dispose()

    push()
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(2);
    for (let i = 0; i < curveX.length; i++) {
      let x = map(curveX[i], -1, 1, 0, width);
      let y = map(curveY[i], -1, 1, height, 0);
      vertex(x, y);
    }
    endShape();
    pop()

}
function keyPressed(){
    if (keyIsDown(81)) {
        ON_TRAINING = !ON_TRAINING
    }
}
function mousePressed(){
    TRUE_MOUSE_PRESS = true
    console.log('msosue press')
}
