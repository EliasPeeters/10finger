let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.get('/api/getlasttest', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }


    let queryLastTest= `SELECT wpm, accuracy FROM tests WHERE user_id=${mysql.escape(user.id)} ORDER BY date DESC LIMIT 1`
    let resultLastTest = await connection.asyncquery(queryLastTest)

    res.send({resultLastTest: resultLastTest[0]})
});