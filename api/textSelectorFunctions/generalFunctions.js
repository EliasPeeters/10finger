let mysql = require('mysql');

async function getTexts(user) {

    let queryTexts;

    // not logged in 
    if (user == undefined) {
        queryTexts = `SELECT * FROM texts`
    } else {
        queryTexts = `SELECT * FROM texts
        LEFT JOIN (SELECT * FROM user
            WHERE user_id = '${user.id}') as userQuery
            on texts.id = userQuery.currentText
        ORDER BY currentText DESC`
    } 

    let resultTexts = await connection.asyncquery(queryTexts)

    return resultTexts
}

module.exports = {getTexts}