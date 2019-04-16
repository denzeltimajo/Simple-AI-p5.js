// TODO: kete DO BRAIN

function Brain(){
    const a = tf.tensor([[23,4], [2,5]], [2,2])
    const b = tf.tensor([[1],[2]], [2,1])
    const c = a.matMul(b)

    a.dispose()
    b.dispose()
    c.dispose()

    setTimeout(()=>console.log('testTImeout'), 5000)
    console.log("DONENEEN")
}

Brain.prototype.test = function(){
    x = []
    y = []
    for(let ll=0; ll<10000; ll++){
        x.push(ll)
    }
    for(let ll=0; ll<20; ll++){
        y.push(ll)
    }

    tf.tidy(() => {
        const testTense = tf.tensor2d(x, [500, 20])
        const testTense2 = tf.tensor2d(y, [20, 1])

        const testTenseMult = testTense.matMul(testTense2)
    })
}

function xord_test(sw, ord){
    // console.log('xord staru')
    
    gg = sw ^ ord
    return gg
}