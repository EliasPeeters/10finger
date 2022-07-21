let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.post('/api/selectText', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }

    let query = `UPDATE user
                    SET    
                        currentBook = null,
                        currentText = ${mysql.escape(req.body.textID)}
                    WHERE user_id = ${mysql.escape(user.id)}`
    await connection.asyncquery(query)

    res.send('success')
});