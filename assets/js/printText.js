function printText(text) {
    let wordsBox = document.getElementById('wordsBox');

    if (text.length == 0) {
        document.getElementById('message').classList.add('show');
    } else {
        document.getElementById('message').classList.remove('show');
    }

    let insertText = '<div class="word">'

    for (let i = 0; i < text.length; i++) {
        insertText += `${(i == cursorPosition)?'<div class="cursor"></div>':''}`
        insertText += `<div class="key ${text[i].correct} ${(text[i].done)?'done':''}">${((text[i].key == ' ') && (text[i].correct == 'wrong'))?'_':text[i].key}</div>`
        
        if (text[i].key == ' ') {
            insertText += '</div><div class="word">'
        }
    }
    insertText += '</div>'

    // for (let i = 0; i < text.length; i++) {
    //     insertText += `<div class="key ${(i < cursorPosition)?'done':''}">${text[i]}</div>${(i+1 == cursorPosition)?'<div class="cursor"></div>':''}`
    // }

    wordsBox.innerHTML = insertText
}