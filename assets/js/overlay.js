function showBlackBoxOverlay() {
    document.getElementById('blackBoxOverlay').style.display = 'block'
    document.getElementById('blackBoxOverlay').style.backgroundColor = 'rgba(0,0,0,0.4)'
}

function hideBlackBoxOverlay() {
    document.getElementById('blackBoxOverlay').style.backgroundColor = 'rgba(0,0,0,0)'

    setTimeout(function() { 
        document.getElementById('blackBoxOverlay').style.display = 'none'
    }, 400);
}


function openLogin() {
    showBlackBoxOverlay();
    document.getElementById('login').classList.add('open');
}

function closeLogin() {
    hideBlackBoxOverlay();
    document.getElementById('login').classList.remove('open');
}

function openRegister() {
    showBlackBoxOverlay();
    document.getElementById('register').classList.add('open');
}

function closeRegister() {
    hideBlackBoxOverlay();
    document.getElementById('register').classList.remove('open');
}