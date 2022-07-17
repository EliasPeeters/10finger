let checkLogin = require('../checkLogins');

app.get('/logout', (req, res) => {
    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    } 

    res.clearCookie("session");
    res.clearCookie("id");

    const index = loggedInUsers.indexOf(user);
    if (index > -1) { // only splice array when item is found
        loggedInUsers.splice(index, 1); // 2nd parameter means remove one item only
    }

    res.redirect('/');
})

