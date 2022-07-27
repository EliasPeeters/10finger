
const fs = require('fs')
const credentialsLoader = require('./getCredentials');
const mysqlSetup = require('./mysqlSetup');

credentials = credentialsLoader.getCredentials();
connection = mysqlSetup.getConnection();

let start = 0;
let name = 'kurdistan.txt'
let id = 7

setTimeout(async function() { 
    let data = fs.readFileSync('./books/' + name, 'utf8');

    // convert data to array
    
    
    // data = 'This is a test. Hi and welcome! Ich kann hier auch. Anders cool'
    // let data_array = data.split(/[.!]+/)
    
    let data_array = data.split(/(?=[.:;?!])|(?<=[.:!?;])/g)
    let currentState = 1
    for (let i = 0; i < data_array.length; i++) {
        if (data_array[i][0] == ' ') {
            data_array[i] = data_array[i].slice(1, data_array[i].length)
        }

        if (i%2 == currentState) {
            data_array[i - 1] = data_array[i - 1] + data_array[i]
            data_array.splice(i, 1)
            i--
            if (currentState == 1) {
                currentState = 0
            } else {
                currentState = 1
            }
        }
    }
    console.log(data_array.length)
    for (let i = 0; i < data_array.length; i++) {
        let query = connection.createQueryStringFromObject({
            table: 'book_lines',
            book_id: id,
            sentence: data_array[i],
            number: i
        });
        await connection.asyncquery(query)
        console.log(i)
    }
    // console.log(data_array)

    // console.log("1、2、3".split(/(?!、)/g))
}, 2000);
