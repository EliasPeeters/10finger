let checkLogin = require('../checkLogins');

app.get('/', (req, res) => {
    let data = {
        loggedIn: false,
        ads: 3
    }

    let user = checkLogin.checkLogin(req);

    if (user !== null)  {
        data = user;
        data.loggedIn = true
    } 
    console.log(data)
    res.render('home', {data})
})