let mysql = require('mysql');
let checkLogin = require('../checkLogins');

let getCurrent = require('./textSelectorFunctions/getCurrent');
let bookFunctions = require('./textSelectorFunctions/bookFuntions')
let generalFunctions = require('./textSelectorFunctions/generalFunctions');


app.get('/api/getTextSelector', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        const texts = await generalFunctions.getTexts()
        const books = await bookFunctions.getBooks()

        let tab;
        if (req.query.selectedType == 'text') {
            for (let i = 0; i < texts.length; i++) {
                console.log(texts[i].id)
                if (texts[i].id == req.query.selectedID) {
                    texts[i].currentText = req.query.selectedID
                    let item = texts[i]
                    texts.splice(i, 1)
                    texts.unshift(item)
                    break;
                }
            }
            tab = 'generale'
        } else {
            for (let i = 0; i < books.length; i++) {
                console.log(books[i].id)
                if (books[i].book_id == req.query.selectedID) {
                    books[i].selected = req.query.selectedID
                    let item = books[i]
                    books.splice(i, 1)
                    books.unshift(item)
                    break;
                }
            }
            tab = 'books'
        }

        const current = await getCurrent.getCurrentNotLoggedIn(req.query.selectedType, req.query.selectedID);
        res.render('backend/textSelector', {books, tab, current, texts, user})
        return
    }

    let books = await bookFunctions.getBooks(user)
    let texts = await generalFunctions.getTexts(user)
    let tab = req.query.tab == undefined? 'generale':req.query.tab;

    let current = await getCurrent.getCurrent(user)
    if (current.type == 'text') {
        tab = 'generale'
    } else if (current.type == 'book') {
        tab = 'books'
    }

    console.log(books)

    res.render('backend/textSelector', {books, tab, current, texts, user})
});