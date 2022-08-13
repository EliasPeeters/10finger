let mysql = require('mysql');
let checkLogin = require('../checkLogins');
let getCurrent = require('./textSelectorFunctions/getCurrent');

app.get('/api/getcurrent', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    // check if not logged in
    if (user === null)  {
        let current = await getCurrent.getCurrentNotLoggedIn(req.query.selectedType, req.query.selectedID, req.query.currentSentence);
        res.render('backend/homeCurrent',{data: current})
        return
    }

    let current = await getCurrent.getCurrent(user)

    res.render('backend/homeCurrent',{data: current})
});