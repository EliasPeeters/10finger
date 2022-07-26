function createBookString(book) {
    if (book.progress == null) {
        book.progress = 0
    }
    let string = ''
    
    if (book.selected == null) {
        string += `<div class="book">`
    } else {
        string += `<div class="book selected">`
    }

    string += `<img class="bookcover" src="./assets/img/bookcover/${book.book_cover}">`
    string += `<div class="progess">`
    if (book.book_id == 0) {
        string += `<div class="progessSpacer"></div>`
    } else {
        string += `<div class="progessBar">`
        string += ` <div class="progessInner" style="width:${Math.round(book.progress * 100) / 100}%"></div>`
        string += `</div>`
        string += `<p class="percent">${Math.round(book.progress * 100) / 100}%</p>`
    }
    
    
    string += `</div>`
    if (book.selected != null) {
        string += `<button class="button one" onclick="closeSettings()">Settings</button>`
    } else if (book.progress != 0 || book.book_id == 0) {
        string += `<button class="button one" onclick="selectBook(${book.book_id})">Continue</button>`
    } else {
        string += `<button class="button one" onclick="selectBook(${book.book_id})">Start</button>`
    }
    string += `</div>`

    return string
}

function getBooks() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", '/api/getbooks', false);
    xmlHttp.send(null);
    let books = JSON.parse(xmlHttp.responseText);

    let string = ''
    for (element of books) {
        string += createBookString(element)
    }

    string += `<div class="emptyBook"></div><div class="emptyBook"></div><div class="emptyBook"></div><div class="emptyBook"></div>`

    document.getElementById('bookShelf').innerHTML = string
}

function selectBook(id) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", '/api/selectBook', false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify({
        id: id
    }));
    let text = xmlHttp.responseText;
    getBooks();
    restart();
}