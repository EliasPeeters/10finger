let checkLogin = require('../checkLogins');

app.get('/', (req, res) => {
    let data = {
        loggedIn: false
    }

    let user = checkLogin.checkLogin(req);

    if (user !== null)  {
        data = user;
        data.loggedIn = true
    } 

    res.render('home', {data})
})