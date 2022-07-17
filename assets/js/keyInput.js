document.getElementById('body').addEventListener('keypress', (event) => {

    if (cursorPosition == 0) {
        startTime = Date.now()
    }

    text[cursorPosition].done = 'true'
    if (text[cursorPosition].key == event.key) {
        text[cursorPosition].correct = 'correct'
    } else {
        text[cursorPosition].correct = 'wrong'
    }

    cursorPosition += 1
    printText(text)
    
    if (cursorPosition == text.length) {
        calculate()
        restart()
    }
    // console.log(event)
})