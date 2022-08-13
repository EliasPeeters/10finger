function switchTab(tab) {
    let tabContent = document.getElementsByClassName('tabContent')[0]
    let tabSelector = document.getElementsByClassName('tabSelector')[0]
    
    tabContent.classList.remove('generale')
    tabContent.classList.remove('books')
    tabContent.classList.remove('courses')

    tabSelector.classList.remove('generale')
    tabSelector.classList.remove('books')
    tabSelector.classList.remove('courses')

    tabContent.classList.add(tab)
    tabSelector.classList.add(tab)
}

function selectBook(bookID) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", '/api/selectBook', false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({
        bookID
    }));
    let text = xmlHttp.responseText;
    restart()
    closeOverlay()
}

function selectText(textID) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", '/api/selectText', false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({
        textID
    }));
    let text = xmlHttp.responseText;
    restart()
    closeOverlay()
}


function selectBookTextNotLoggedIn(id, type) {
    selectedType = type;
    selectedID = id;
    restart();
    closeOverlay();
}



