let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.get('/api/getbooks', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }

    let queryBooks = `SELECT premium, books.book_id as book_id, book_cover, sentence/numberOfLines * 100 as progress, selected
    from books
        LEFT JOIN (SELECT count(*) as numberOfLines, book_id
            from book_lines
            GROUP BY book_id) as nOLbi
            on nOLbi.book_id = books.book_id
        LEFT JOIN (SELECT * from progress_books
            WHERE user_id = ${mysql.escape(user.id)}) as progressTable
            on progressTable.book_id = books.book_id
        LEFT JOIN (SELECT currentBook as selected FROM user
            WHERE user_id = ${mysql.escape(user.id)}) as bookUser
            on bookUser.selected = books.book_id ORDER BY selected DESC;`
    let resultBooks = await connection.asyncquery(queryBooks)

    if (user.premium == 0) {
        for (let i = 0; i < resultBooks.length; i++) {
            if (resultBooks[i].premium == 1) {
                resultBooks.splice(i, 1);
                i--
            }
        }
    }


    res.send(resultBooks)
});