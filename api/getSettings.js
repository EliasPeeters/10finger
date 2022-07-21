let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.get('/api/getSettings', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }


    res.render('backend/settings')
});