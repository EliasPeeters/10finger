let mysql = require('mysql');
let checkLogin = require('../checkLogins');

app.get('/api/averageData', async (req, res) => {

    let user = checkLogin.checkLogin(req);

    if (user === null)  {
        res.send('401')
        return
    }


    let queryAverageAll = `SELECT COUNT(*) as amount, avg(wpm) as wpm, avg(accuracy) as accuracy, sum(duration) as duration FROM tests WHERE user_id=${mysql.escape(user.id)}`
    let resultAverageAll = await connection.asyncquery(queryAverageAll)

    let queryAverageToday = `SELECT COUNT(*) as amount, avg(wpm) as wpm, avg(accuracy) as accuracy, sum(duration) as duration FROM tests WHERE date(date) = CURDATE() AND user_id=${mysql.escape(user.id)}`
    let resultAverageToday = await connection.asyncquery(queryAverageToday)

    let queryBestAll = `SELECT wpm FROM tests WHERE user_id=${mysql.escape(user.id)} ORDER BY wpm DESC LIMIT 1;`
    let resultBestAll = await connection.asyncquery(queryBestAll)

    let queryBestToday = `SELECT wpm FROM tests WHERE user_id=${mysql.escape(user.id)} AND date(date) = CURDATE() ORDER BY wpm DESC LIMIT 1;`
    let resultBestToday = await connection.asyncquery(queryBestToday)

    if (resultAverageAll[0].amount == 0) {
        resultAverageAll[0] = {
            amount: 0,
            wpm: 0,
            accuracy: 0,
            duration: 0
        }
    }

    if (resultAverageToday[0].amount == 0) {
        resultAverageToday[0] = {
            amount: 0,
            wpm: 0,
            accuracy: 0,
            duration: 0
        }
    }
    
    if (resultBestAll[0] == undefined) {
        resultBestAll[0] = {
            wpm: 0
        }
    }

    if (resultBestToday[0] == undefined) {
        resultBestToday[0] = {
            wpm: 0
        }
    }
    
    res.send({
        averageAll: resultAverageAll[0],
        averageToday: resultAverageToday[0],
        bestAll: resultBestAll[0],
        bestToday: resultBestToday[0]
    })
});