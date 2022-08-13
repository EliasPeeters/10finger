let sidebar = document.getElementById("sidebar")
let sidebarContent = document.getElementById("sidebarContent");
let sidebarButtons = document.getElementsByClassName('sidebarButton')

function showBlackBox() {
    document.getElementById('blackBox').style.display = 'block'
    document.getElementById('blackBox').style.backgroundColor = 'rgba(0,0,0,0.4)'
}

function hideBlackBox() {
    document.getElementById('blackBox').style.backgroundColor = 'rgba(0,0,0,0)'

    setTimeout(function() { 
        document.getElementById('blackBox').style.display = 'none'
    }, 400);
}


function openSidebar(content) {
    showBlackBox();
    let contentHTML = getSidebarContent(content, 'books');

    sidebar.classList.add('sidebarOpen')
    sidebar.classList.remove('close')

    setTimeout(function() { 
        for (button of sidebarButtons) {
            button.classList.add('hidden')
        }
    }, 100);

    setTimeout(function() { 
        insertSidebarContent(contentHTML)
    }, 150);
}

function closeSiderbar() {
    hideBlackBox();
    sidebar.classList.remove('sidebarOpen')
    sidebar.classList.add('close')

    setTimeout(function() { 
        sidebarContent.innerHTML = '';
    }, 100);
    for (button of sidebarButtons) {
        button.classList.remove('hidden')
    }
}

function getSidebarContent(content, tab) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", `/api/get${content}?tab=${tab}&selectedType=${selectedType}&selectedID=${selectedID}`, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function insertSidebarContent(content) {
    sidebarContent.innerHTML = content;
}