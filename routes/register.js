const {v4} = require('uuid');
const bcrypt = require('bcrypt')

app.post('/register', async (req, res) => {
    if (req.body.mail && req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, credentials.fingers.salts);

        let user_id = uuid = v4();

        let queryUser = connection.createQueryStringFromObject({
            table: 'user',
            mail: req.body.mail,
            password_hash: hashedPassword,
            user_id: user_id
        });

        await connection.asyncquery(queryUser)

        res.redirect('/');

    } else {
        res.redirect('/');
    }
})