function calculate() {
    let currentTime = Date.now();
    let difference = (currentTime - startTime) / 1000 / 60;

    // count wrong chars
    let wrong = 0
    for (element of text) {
        if (element.correct == 'wrong') {
            wrong++
        }
    }

    // console.log(difference)
    let wpm = ((text.length / 5) / difference) - (wrong / difference)

    if (wpm < 7) {
        return
    }
    document.getElementById('speed').innerHTML = Math.trunc(wpm * 100) / 100 + ' wpm'

    

    let accuarcy = 1 - (wrong / text.length)
    document.getElementById('accuarcy').innerHTML = Math.trunc(accuarcy * 10000) /100 + ' %'

    if (loggedIn) {
        finishedTest(wpm, accuarcy, difference)
    }
}