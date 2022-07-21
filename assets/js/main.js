var text;
var cursorPosition;
var startTime;
var nextSentence;
var book;

function restart() {
    text = getText()
    cursorPosition = 0
    printText(text)
    getCurrent()
}

restart()

if (loggedIn) {
    loadLastTest()
}