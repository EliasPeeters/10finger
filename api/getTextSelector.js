let mysql = require('mysql');
let checkLogin = require('../checkLogins');

let getCurrent = require('./textSelectorFunctions/getCurrent');
let bookFunctions = require('./textSelectorFunctions/bookFuntions')
let generalFunctions = require('./textSelectorFunctions/generalFunctions')

app.get('/api/getTextSelector', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }

    let books = await bookFunctions.getBooks(user)
    let texts = await generalFunctions.getTexts(user)
    let tab = req.query.tab == undefined? 'generale':req.query.tab;


    let current = await getCurrent.getCurrent(user)

    res.render('backend/textSelector', {books, tab, current, texts})
});