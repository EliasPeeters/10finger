var text;
var cursorPosition;
var startTime;
var nextSentence = 0;
var currentSentence = 0;
var book;

// this var stores the current text or book id for a not logged in user 
var selectedType = 'text'
var selectedID = 1;

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