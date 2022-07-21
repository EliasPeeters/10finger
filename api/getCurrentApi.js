let mysql = require('mysql');
let checkLogin = require('../checkLogins');
let getCurrent = require('./textSelectorFunctions/getCurrent');

app.get('/api/getcurrent', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }

    let current = await getCurrent.getCurrent(user)
    console.log(current)

    res.render('backend/homeCurrent',{data: current})
});