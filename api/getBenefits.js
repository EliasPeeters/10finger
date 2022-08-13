let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.get('/api/getBenefits', async (req, res) => {
    res.render('backend/benefits')
});