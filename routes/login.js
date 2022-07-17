let mysql = require('mysql');
const {v4} = require('uuid');
const bcrypt = require('bcrypt');

app.post('/login', async(req, res) => {

    if (req.body.mail && req.body.password) {
        let queryUser = `SELECT mail, password_hash, user_id, premium FROM user WHERE mail=${mysql.escape(req.body.mail)}`;
        
        let result =  await connection.asyncquery(queryUser)

        if (result.length == 0) {
            res.redirect('/');
            return
        }

        bcrypt.compare(req.body.password, result[0].password_hash, async (e, same) => {
            if (same) {
                let uuid = v4();
                loggedInUsers.push({session: uuid, id: result[0].user_id, premium: result[0].premium});
                res.cookie('session', uuid)
                res.cookie('id', result[0].user_id)
                res.redirect('/');
            } else {
                console.log('wrong user')
                res.redirect('/');
            }
        })
    } else {
        res.redirect('/')
    }
})