// TODO: kete DO BRAIN
let TRUE_MOUSE_PRESS = false
function Brain(){

    this.xPoints = []
    this.yPoints = []

    this.model = tf.sequential()

    const hidden = tf.layers.dense({
        units: 4,
        inputShape: [2],
        activation: 'sigmoid'
    })

    this.model.add(hidden)

    const output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    })
    this.model.add(output)

    this.a = tf.variable(tf.scalar(random(-1, 1)))
    this.b = tf.variable(tf.scalar(random(-1, 1)))
    this.c = tf.variable(tf.scalar(random(-1, 1)))
    this.d = tf.variable(tf.scalar(random(-1, 1)))

    this.learningRate = 0.03;
    this.optimizer = tf.train.sgd(this.learningRate);

    this.model.compile({
        optimizer: this.optimizer,
        loss: tf.losses.meanSquaredError,

    })

    this.model.layers[0].setWeights(
        [
            tf.tensor(
                // For Hidden Layer w
                [[5.3980837 , -3.8279319, -5.5862536, -1.3197135],
                 [-6.0987945, 3.2092226 , 4.9390283 , -0.5350654]]
            ),
        
            tf.tensor(
                // For Hidden Layer b
                [-2.8283997, -2.092407, -2.815907, 0.301287]
            )
        ]
    )

    this.model.layers[1].setWeights(
        [
            tf.tensor(
                // For Output Layer w
                [[9.3258753 ],
                 [3.6948686 ],
                 [7.2076254 ],
                 [-2.1022294]]
            ),
        
            tf.tensor(
                // For Output Layer b
                [-4.1696444]
            )
        ]    
    )

    const xs = tf.tensor([
        [1.0, 1.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [0.0, 0.0],
    ])

    const ys = tf.tensor([
        [0.0],
        [1.0],
        [1.0],
        [0.0],
    ])

    // const history = this.model.fit(xs, ys)\
    this.fitAndFunky(xs, ys)
        .then((response) => {
            console.log("DONE")

            const inputs = tf.tensor([[0.0, 0.0]])
            xs.print()
            const outputs = this.model.predict(xs)
            outputs.print()
            let values = outputs.dataSync()

            for(let i=0; i<values.length; i++){
                console.log(i+" : "+Math.round(values[i]))
            }

            console.log('WEIGHTS')
            const weight = this.model.getWeights()
            for(let i=0; i<weight.length; i++){
                weight[i].print()
            }

        })
    

    
}

Brain.prototype.fitAndFunky = async function(xs, ys){
    for(let i=0; i<10; i++){
        response = await this.model.fit(xs, ys, {
            epochs: 20,
        })
        console.log(response.history.loss[0])
    }
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

// TODO: kete UNCOMMENT WHEN TENSORFLOW TESTING
function keyPressed(){
    if (keyIsDown(81)) {
        ON_TRAINING = !ON_TRAINING
    }
}

function mousePressed(){
    TRUE_MOUSE_PRESS = true
}
