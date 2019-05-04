// TODO: kete DO BRAIN
let TRUE_MOUSE_PRESS = false

let sepalLengthSlider
let sepalWidthSlider
let petalLengthSlider
let petalWidthSlider

function Brain(){

    this.xPoints = []
    this.yPoints = []

    this.model = tf.sequential()

    const hidden = tf.layers.dense({
        units: 16,
        inputShape: [4],
        activation: 'sigmoid'
    })

    this.model.add(hidden)

    const secondHidden = tf.layers.dense({
        units: 16,
        activation: 'sigmoid'
    })

    this.model.add(secondHidden)

    const output = tf.layers.dense({
        units: 3,
        activation: 'softmax'
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
        loss: tf.losses.softmaxCrossEntropy,

    })

    this.model.layers[0].setWeights(
        [
            tf.tensor(
                // For Hidden Layer w
                [[-0.9946362, 0.4317697 , -0.1773663, -0.3443081, 0.1500743 , 0.1270223 , -0.0276769, 0.7579854 , 1.1248519 , 0.4763702 , 0.2888511 , -0.2807198, 0.0569779 , -0.234164 , -0.4102149, -0.2236904],
                [-1.892897 , 0.8852054 , 0.3034888 , 0.0335613 , 0.7998957 , 0.6015516 , 0.0671616 , 1.6346921 , 1.4985136 , 0.7908242 , 1.1200557 , -0.6065292, -0.0606316, -0.8856069, -0.2170233, -0.3595107],
                [3.2290995 , -1.4900399, -0.1342831, -0.1826311, -1.6182402, -0.0145899, 1.553719  , -2.9582384, -3.1113684, -1.4726665, -1.9278114, 1.6269772 , 0.7418615 , 1.6628485 , 1.4835016 , 0.8951017 ],
                [3.5171356 , -2.1289921, -0.3410089, 0.5048541 , -1.4642216, -0.3193376, 0.6500537 , -2.8397508, -3.3649008, -2.0861883, -2.1458335, 1.8613225 , -0.1287062, 1.6058763 , 1.0721897 , 0.8215733 ]]
            ),
        
            tf.tensor(
                // For Hidden Layer b
                [-1.3194364, 0.6729494, -0.0185833, 0.0401688, 0.4663731, -0.0819952, -0.3240951, 1.1482502, 1.4780551, 0.6028854, 0.735392, -0.7391514, 0.1098825, -0.3478486, -0.1918586, 0.1185362]
            )
        ]
    )

    this.model.layers[1].setWeights(
        [
            tf.tensor(
                // For Output Layer w
                [[-1.1626792, 0.0470605 , -0.1733178, 1.7329741 , -1.03973  , -0.4658569, 2.4281528 , -0.2556637, 2.1722147 , -2.6183205, 1.6905943 , 0.4958704 , 1.7123638 , -2.5860481, -0.6295983, -1.486174 ],
                [0.6256932 , -0.1536315, 0.2557427 , -0.4759746, 0.4839724 , 0.2578387 , -1.2230971, 0.5027893 , -0.9675676, 0.6139055 , -0.9626772, 0.2305916 , -0.4043377, 1.7605653 , 0.310657  , 0.9250963 ],
                [-0.2603646, 0.461791  , 0.3803534 , 0.0717815 , 0.0323232 , -0.2426423, 0.0119662 , 0.0817028 , -0.0112336, 0.0996891 , 0.1373474 , 0.0862107 , 0.0148567 , 0.3148612 , 0.1265434 , 0.4542125 ],
                [0.0829668 , 0.1680672 , 0.1143358 , 0.6072066 , 0.0718071 , 0.244647  , -0.0400146, 0.0044602 , -0.0595094, -0.1609619, 0.0722949 , -0.1910399, 0.2504638 , -0.4070041, 0.0139362 , 0.3635619 ],
                [0.265391  , 0.2866019 , 0.0419948 , -0.3704953, 0.6556652 , -0.0287299, -0.8964976, 0.3814475 , -0.6197845, 0.8385134 , -0.6593653, 0.383003  , -0.8442528, 1.3430122 , 0.1896804 , 0.7247807 ],
                [0.0899399 , 0.1677192 , 0.3070451 , -0.1483924, 0.2666521 , 0.0951967 , -0.1053005, -0.120911 , -0.0558676, 0.1399205 , -0.3171933, 0.1840549 , -0.0290721, -0.2398845, -0.3783668, -0.0421911],
                [-0.5055987, -0.2532507, -0.0379983, 0.6530792 , -0.3125978, 0.3731295 , 0.7545044 , -0.0938847, 0.209839  , -0.9425088, 0.3219068 , 0.1237569 , 0.8272761 , -0.8036451, 0.0502383 , -0.676514 ],
                [0.4285133 , -0.0989285, 0.298628  , -1.2606261, 0.7607585 , 0.4835739 , -1.7006693, 0.523349  , -1.879127 , 1.8765645 , -1.3101974, -0.2544947, -1.5083961, 2.4137518 , 0.7969639 , 1.2344797 ],
                [0.705238  , 0.0162434 , 0.2046819 , -1.259988 , 1.2191893 , -0.0512923, -2.1844349, 0.438916  , -2.2919123, 1.4777766 , -1.6179093, -0.0083753, -1.3090813, 2.8938639 , 0.7621952 , 1.2767911 ],
                [0.493395  , 0.2417924 , 0.3840944 , -0.5745987, 0.6424062 , 0.1756949 , -1.2884421, 0.1137754 , -0.8294652, 0.9124811 , -1.1247472, -0.2431905, -0.3321798, 1.3803734 , 0.2816596 , 0.7179297 ],
                [0.7506691 , -0.0993205, 0.0220538 , -0.8623515, 0.648643  , 0.2539633 , -1.4985526, 0.3988888 , -1.1628438, 1.2990721 , -0.6529904, 0.2785832 , -0.7217894, 1.4960438 , 0.414807  , 0.8226337 ],
                [-0.4374771, 0.394007  , 0.1624124 , 0.8148618 , -0.7326249, 0.1149076 , 1.0159504 , -0.3612769, 1.1950698 , -1.1213081, 0.6901244 , 0.0580397 , 0.6530963 , -1.5493894, -0.7306331, -0.7228335],
                [-0.156099 , 0.023379  , -0.1328568, 0.2348748 , -0.1409383, -0.2223424, 0.0581157 , 0.3226713 , -0.2526732, -0.6070955, 0.2196853 , 0.1851353 , 0.7605653 , 0.1565658 , -0.1042007, -0.2948929],
                [-0.5635446, -0.0057266, 0.2100484 , 0.4778314 , -0.4395478, -0.0236067, 0.6485193 , -0.312206 , 0.9500152 , -1.722055 , 0.98887   , -0.1511131, 0.9887584 , -1.0671827, -0.229294 , -0.6190763],
                [-0.2038747, 0.0041136 , 0.0790468 , 0.8435848 , -0.8376603, 0.1050319 , 0.3572872 , -0.0830832, 0.6523596 , -1.2118133, 0.7418679 , 0.3035186 , 0.7883433 , -0.67436  , -0.1141156, -0.3059821],
                [-0.3508152, 0.28901   , 0.1052367 , 0.8505658 , -0.2131872, -0.1661636, 0.5567253 , 0.1533012 , 0.3894289 , -0.9723837, -0.1852614, 0.3107331 , 0.7247192 , -0.3193894, -0.1960846, -0.2180835]]
            ),
        
            tf.tensor(
                // For Output Layer b
                [-0.0396381, 0.0565507, 0.0930098, 0.2181889, -0.0693424, 0.0523505, -0.1548708, -0.0640713, -0.0546836, -0.7015903, -0.0165777, 0.1196025, 0.3368718, 0.1459119, -0.022453, 0.0693412]
            )
        ]    
    )

    this.model.layers[2].setWeights(
        [
            tf.tensor(
                // For Output Layer w
                [[1.6999731 , -0.0922181, -1.2066233],
                [-0.047335 , -0.1167902, 0.1494188 ],
                [-0.2780203, -0.0674619, -0.6443195],
                [-2.7701097, 1.0432035 , 2.3385882 ],
                [1.5058434 , 0.1709569 , -2.0975542],
                [0.0611465 , 0.2919676 , -0.491654 ],
                [-2.5225468, -2.2164171, 3.5795228 ],
                [0.2938382 , 0.2705713 , -0.9003381],
                [-3.466466 , -1.2810595, 3.7182343 ],
                [3.3620315 , -3.1056995, -3.2135987],
                [-2.3818603, -1.0111439, 2.9177661 ],
                [-0.650135 , 0.1391319 , -0.1135693],
                [-3.2410152, 1.318056  , 1.6097053 ],
                [1.9372782 , 2.7008486 , -5.0304627],
                [0.6188772 , -0.1321067, -1.4496542],
                [1.1555194 , 0.7341309 , -2.8656969]]
            ),
        
            tf.tensor(
                // For Output Layer b
                [-0.452726, -0.1961999, -0.3015476]
            )
        ]    
    )

    const xs = tf.tensor2d(IRIS_INPUT_DATA)

    xs.print()

    const ys = tf.oneHot(tf.tensor1d(IRIS_LABEL_DATA, 'int32'), 3)

    ys.print()

    sepalLengthSlider = createSlider(0, 100, 50);
    sepalLengthSlider.position(100, 150);

    sepalWidthSlider = createSlider(0, 50, 25);
    sepalWidthSlider.position(100, 250);

    petalLengthSlider = createSlider(0, 80, 40);
    petalLengthSlider.position(100, 350);

    petalWidthSlider = createSlider(0, 40, 20);
    petalWidthSlider.position(100, 450);

    // const history = this.model.fit(xs, ys)\
    this.fitAndFunky(xs, ys)
        .then((response) => {
            console.log("DONE")

            // const inputs = tf.tensor2d([[6.0,2.7,5.0,1.6,]])
            // inputs.print()
            // const outputs = this.model.predict(inputs)
            // outputs.print()
            // let values = outputs.dataSync()

            // for(let i=0; i<values.length; i++){
            //     console.log(i+" : "+Math.round(values[i]))
            // }

            console.log('WEIGHTS')
            const weight = this.model.getWeights()
            for(let i=0; i<weight.length; i++){
                weight[i].print()
            }

        })
    

    
}

Brain.prototype.fitAndFunky = async function(xs, ys){
    for(let i=0; i<0; i++){
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

    // TEXT LINE ==================

    sepalLengthValue = sepalLengthSlider.value() / 10
    sepalWidthValue = sepalWidthSlider.value() / 10
    petalLengthValue = petalLengthSlider.value() / 10
    petalWidthValue = petalWidthSlider.value() / 10

    textSize(25);
    fill(255);
    text('SepalLengthCm: '+sepalLengthValue, 100, 150);
    text('PepalWidthCm: '+sepalWidthValue, 100, 250);
    text('PetalLengthCm: '+petalLengthValue, 100, 350);
    text('PetalWidthCm: '+petalWidthValue, 100, 450);

    // PREDICTION LINE ======================
    let predict_values
    tf.tidy(() => {
        const inputs = tf.tensor2d([
            [sepalLengthValue/10,
             sepalWidthValue/5,
             petalLengthValue/8,
             petalWidthValue/4,]
        ])
        // inputs.print()
        const outputs = this.model.predict(inputs)
        // outputs.print()
        predict_values = outputs.dataSync()
    })

    // BAR GRAPH LINE =====================
    
    for(let i=0; i<predict_values.length; i++){
        let barLength = predict_values[i] * 400
        push()
        fill(IRIS_COLOR_INDEX[i])
        beginShape();
        
        vertex(500 + (100*i), 100 + (400 - barLength) );
        vertex(550 + (100*i), 100 + (400 - barLength));
        vertex(550 + (100*i), 500);
        vertex(500 + (100*i), 500);

        endShape(CLOSE);
        pop()
    }


}

// TODO: kete UNCOMMENT WHEN TENSORFLOW TESTING
// function keyPressed(){
//     if (keyIsDown(81)) {
//         ON_TRAINING = !ON_TRAINING
//     }
// }

// function mousePressed(){
//     TRUE_MOUSE_PRESS = true
// }
