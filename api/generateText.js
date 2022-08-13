const txtgen = require('txtgen')
const Gen = require('sentence-generator')
let checkLogin = require('../checkLogins');
let mysql = require('mysql');
// import {DictionaryFrequency} from "correct-frequency-random-letters"


const basic = Gen('./texts/basic.txt');
const coding = Gen('./texts/coding.txt');
const politics = Gen('./texts/politics.txt');

async function getNextSentence(book_id, sentence) {
    let query = `SELECT sentence FROM book_lines WHERE book_id = ${book_id} AND number = ${sentence}`
    let currentSentence = await connection.asyncquery(query)

    try {
        return currentSentence[0].sentence
    } catch {
        return 'error'
    }
}

function generateText(currentText) {
    if (currentText == 3) {
        return {sentence: politics.take(2), nextSentence: 0}
    } else if (currentText == 2) {
        return {sentence: coding.take(4), nextSentence: 0}
    } else {
        return {sentence: basic.take(2), nextSentence: 0}
    }
}

async function getBookString(sentence, book_id) {
    let string = ''
    while (string.length < 100) {
        let nextSentence = await getNextSentence(book_id, sentence)
        if (nextSentence == 'error') {
            break;
        }
        string += nextSentence + ' '
        sentence++
    }

    string = string.slice(0, string.length - 1);
    return {
        sentence: string,
        nextSentence: sentence
    }
}

app.get('/api/generateText', async (req, res) => {
    // let text = txtgen.sentence();
    // res.send(text)
    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        // if not logged in, send basic text

        if (req.query.selectedType == 'text') {
            res.send(generateText(req.query.selectedID))
        } else {
            let sentenceObject = await getBookString(req.query.nextSentence, req.query.selectedID)
            res.send({
                sentence: sentenceObject.sentence, 
                nextSentence: sentenceObject.nextSentence, 
            })
        }
        return
    }

    // get book id
    let currentSentenceQuery = `SELECT sentence, book_id from progress_books where book_id = (SELECT currentBook from user WHERE user_id = ${mysql.escape(user.id)}) AND user_id = ${mysql.escape(user.id)}`
    let currentSentence = await connection.asyncquery(currentSentenceQuery)

    // check for book == 
    if (currentSentence.length == 0) {
        // this means text selected

        // get current text
        let currentTextQuery = `SELECT * FROM texts
            LEFT JOIN (SELECT * FROM user
                WHERE user_id = '${user.id}') as userQuery
                on texts.id = userQuery.currentText
            ORDER BY currentText DESC
            LIMIT 1`
        let currentText = await connection.asyncquery(currentTextQuery);

        res.send(generateText(currentText[0].id))
    
        return
    }

    let sentence = currentSentence[0].sentence

    let stringObject = await getBookString(sentence, currentSentence[0].book_id)

    res.send({
        sentence: stringObject.sentence, 
        nextSentence: stringObject.nextSentence, 
        book: currentSentence[0].book_id
    })
});

// console.log(gen.take(2))