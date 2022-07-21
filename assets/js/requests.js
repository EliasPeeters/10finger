function finishedTest(wpm, accuracy, duration) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", '/api/finishedTest', false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({
        wpm, accuracy, duration, nextSentence, book
    }));
    let text = xmlHttp.responseText;
}

function generateTimeString(minutes_input) {
    hours = Math.trunc(minutes_input / 60)
    minutes = Math.trunc((minutes_input - hours * 60))
    seconds = Math.round((minutes_input - hours * 60 - minutes) * 60) 
    
    hours = hours < 10?'0' + hours: hours
    minutes = minutes < 10?'0' + minutes: minutes
    seconds = seconds < 10?'0' + seconds: seconds

    return hours + ':' + minutes + ':' + seconds
}

function getAverageData() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", '/api/averageData', false);
    xmlHttp.send();
    let result = JSON.parse(xmlHttp.responseText);

    document.getElementById('accuarcy_avg_all').innerHTML = Math.round(result.averageAll.accuracy * 10000) / 100 +  ' %'
    document.getElementById('speed_avg_all').innerHTML = (Math.round(result.averageAll.wpm * 100) / 100 ) + ' wpm'
    document.getElementById('best_all').innerHTML = (Math.round(result.bestAll.wpm * 100) / 100 ) + ' wpm'
    document.getElementById('lessons_all').innerHTML = result.averageAll.amount
    document.getElementById('time_all').innerHTML = generateTimeString(result.averageAll.duration)

    document.getElementById('accuarcy_avg_today').innerHTML = Math.round(result.averageToday.accuracy * 10000) / 100 +  ' %'
    document.getElementById('speed_avg_today').innerHTML = (Math.round(result.averageToday.wpm * 100) / 100 ) + ' wpm'
    document.getElementById('best_today').innerHTML = (Math.round(result.bestToday.wpm * 100) / 100 ) + ' wpm'
    document.getElementById('lessons_today').innerHTML = result.averageToday.amount
    document.getElementById('time_today').innerHTML = generateTimeString(result.averageToday.duration)
}


function loadLastTest() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", '/api/getlasttest', false);
    xmlHttp.send();
    let result = JSON.parse(xmlHttp.responseText);


    document.getElementById('speed').innerHTML = Math.round(result.resultLastTest.wpm * 100) / 100 + ' wpm'
    document.getElementById('accuarcy').innerHTML = Math.round(result.resultLastTest.wpm * 100) / 100 + ' %'
}
