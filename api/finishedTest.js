let checkLogin = require('../checkLogins');
let mysql = require('mysql');

app.post('/api/finishedTest', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }
    
    const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')

    let queryTest = connection.createQueryStringFromObject({
        table: 'tests',
        wpm: req.body.wpm,
        accuracy: req.body.accuracy,
        user_id: user.id,
        date: datetime,
        duration: req.body.duration
    });

    await connection.asyncquery(queryTest)

    // update current sentence
    let queryProgress = connection.createQueryStringFromObject({
        table: 'progress_books',
        user_id: user.id,
        book_id: req.body.id,
        sentence: 0
    });

    let queryUpdateSentence = `UPDATE progress_books
                    SET sentence = ${mysql.escape(req.body.nextSentence)}
                    WHERE user_id = ${mysql.escape(user.id)} AND book_id = ${mysql.escape(req.body.book)}`

    await connection.asyncquery(queryUpdateSentence)



    res.send('success')
});