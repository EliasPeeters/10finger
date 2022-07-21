const express = require('express');
const credentialsLoader = require('./getCredentials');
const mysqlSetup = require('./mysqlSetup');
const cookieParser = require('cookie-parser');

app = express();
credentials = credentialsLoader.getCredentials();
connection = mysqlSetup.getConnection();

loggedInUsers = []

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const homeRoute = require('./routes/home')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const logoutRoute = require('./routes/logout')

const generateTextApi = require('./api/generateText')
const averageApi = require('./api/getAverageData')
const finishedTestApi = require('./api/finishedTest')
const lastTestApi = require('./api/getLastTest')
const booksApi = require('./api/getBooks')
const selectbookApi = require('./api/selectBook')
const textSelectorApi = require('./api/getTextSelector');
const profileApi = require('./api/getProfile')
const settingsApi = require('./api/getSettings')
const selectTextApi = require('./api/selectText')
const getCurrentApi = require('./api/getCurrentApi')


app.listen('3030', () => {
    console.log(`Running on 3030`)
})