// TODO: kete DO BRAIN
//            START WITH Q LEARNING


function Brain(){

    this.xPoints = []
    this.yPoints = []

    this.model = tf.sequential()

    const hidden = tf.layers.dense({
        units: 16,
        inputShape: [2],
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

    this.learningRate = 0.03;
    this.optimizer = tf.train.sgd(this.learningRate);

    this.model.compile({
        optimizer: this.optimizer,
        loss: tf.losses.softmaxCrossEntropy,

    })

    const xs = tf.tensor2d([[0, 1], [1, 0]])

    xs.print()

    const ys = tf.oneHot(tf.tensor1d([0, 1], 'int32'), 3)

    ys.print()

    
}


Brain.prototype.loss = function(pred, label){
    return pred.sub(label).square().mean()
}

Brain.prototype.test = function(sights){

}
