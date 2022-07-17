function checkLogin(req) {
    let user = null;

    for (element of loggedInUsers) {
        if (element.session == req.cookies.session) {
            user = element;
            break;
        }
    }
    return user;
}

module.exports = {checkLogin}