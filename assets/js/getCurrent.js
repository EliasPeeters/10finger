function getCurrent() {
    let url = '/api/getcurrent'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    let current = (xmlHttp.responseText);
    if (current != '401') {
        document.getElementById('homeCurrent').innerHTML = current
    }
    
}
