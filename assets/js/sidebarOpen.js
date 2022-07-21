let sidebar = document.getElementById("sidebar")
let sidebarContent = document.getElementById("sidebarContent");
let sidebarButtons = document.getElementsByClassName('sidebarButton')

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
    xmlHttp.open("get", `/api/get${content}?tab=${tab}`, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function insertSidebarContent(content) {
    sidebarContent.innerHTML = content;
}