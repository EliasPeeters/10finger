let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.post('/api/selectBook', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }

    let query = `UPDATE user
                    SET currentBook = ${mysql.escape(req.body.id)}
                    WHERE user_id = ${mysql.escape(user.id)}`
    await connection.asyncquery(query)


    // check for progress

    let progressCheckQuery = `SELECT * FROM progress_books WHERE user_id = ${mysql.escape(user.id)} AND book_id = ${mysql.escape(req.body.id)}` 
    let progressCheck = await connection.asyncquery(progressCheckQuery)

    if (progressCheck.length == 0) {
        // set progress
        let queryProgress = connection.createQueryStringFromObject({
            table: 'progress_books',
            user_id: user.id,
            book_id: req.body.id,
            sentence: 0
        });

        await connection.asyncquery(queryProgress)
    }
    


    res.send('success')
});