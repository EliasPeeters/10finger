var path = require('path');

app.get('/sitemap', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets', 'sitemap.xml'));
})