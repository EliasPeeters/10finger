let mysql = require('mysql');

async function getCurrent(user) {
    // let query = `SELECT * FROM user
    //                 LEFT JOIN books on currentBook = book_id
    //                 LEFT JOIN texts on currentText = id
    //                 WHERE user_id = '${user.id}';`
                    
    let query = `SELECT author, book_name, name, cover, book_cover, sentence/linesTotal as progress, description  FROM user
    LEFT JOIN books on currentBook = book_id
    LEFT JOIN texts on currentText = id
    LEFT JOIN (SELECT * FROM progress_books WHERE user_id = '${user.id}') as progress
        on books.book_id = progress.book_id
    LEFT JOIN (SELECT count(*) as linesTotal, book_id FROM book_lines GROUP BY book_id) as booklines
        on books.book_id = booklines.book_id
WHERE user.user_id = '${user.id}';`


                    
    console.time('test')
    let result = await connection.asyncquery(query)
    console.timeEnd('test')

    if (result[0].author !== null) {
        return {
            // book
            type: 'book',
            author: result[0].author,
            name: result[0].book_name,
            cover: result[0].book_cover,
            progress: result[0].progress
        }
    } else {
        return {
            // text 
            type: 'text',
            author: '',
            name: result[0].name,
            cover: result[0].cover,
            description: result[0].description
        }
    }

    
}

async function getCurrentNotLoggedIn(selectedType, selectedID, currentSentence = 0) {
    if (selectedType == 'text') {
        //text
        let result = await connection.asyncquery(`SELECT * FROM texts WHERE id = ${mysql.escape(selectedID)}`);
        result.author = ''
        return result[0]
    } else {
        // book
        let result = await connection.asyncquery(`SELECT * FROM books
        LEFT JOIN (SELECT count(*) as numberOfLines, book_lines.book_id From book_lines GROUP BY book_id) as progressQuery on progressQuery.book_id = books.book_id
    WHERE books.book_id = ${mysql.escape(selectedID)}`);

        return {
            name: result[0].book_name,
            cover: result[0].book_cover,
            description: '',
            author: result[0].author,
            progress: currentSentence / result[0].numberOfLines
        }
    }
}

module.exports = {getCurrent, getCurrentNotLoggedIn}