function getText() {
    let url = '/api/generateText'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    let text = JSON.parse(xmlHttp.responseText);

    // let text = "This is a test, how good typing is working"

    nextSentence = text.nextSentence;
    book = text.book
    let output = []

    for (key of text.sentence) {
        output.push({
            key: key,
            done: false,
            correct: ''
        })
    }

    return output
}

