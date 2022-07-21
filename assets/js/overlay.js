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


function openLogin() {
    showBlackBox();
    document.getElementById('login').classList.add('open');
}

function closeLogin() {
    hideBlackBox();
    document.getElementById('login').classList.remove('open');
}

function openRegister() {
    showBlackBox();
    document.getElementById('register').classList.add('open');
}

function closeRegister() {
    hideBlackBox();
    document.getElementById('register').classList.remove('open');
}