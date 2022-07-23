let checkLogin = require('../checkLogins');

app.get('/privacystatement', (req, res) => {

    res.render('datenschutz')
})