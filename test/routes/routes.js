const ctrl = require('../controllers/user')

const route = (app) => {
    app.get('/account', ctrl.account)
    app.post('/signup', ctrl.signup)
    app.post('/login', ctrl.login)
    app.get('/logout', ctrl.logout)
    app.get('/', ctrl.index)
    app.get('/shop', ctrl.shop)
}

module.exports = route