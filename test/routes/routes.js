const ctrl = require('../controllers/user')
const ctrl2 = require('../controllers/product')
const Product = require('../models/product')

const route = (app) => {
    app.get('/account', ctrl.account)
    app.post('/signup', ctrl.signup)
    app.post('/login', ctrl.login)
    app.get('/logout', ctrl.logout)
    app.get('/', ctrl.index)
    app.get('/shop', ctrl.shop)
    app.get('/admin', async (req, res) => {
        try {
            const products = await Product.find();  // Fetch all products from the database
            res.render('admin', { 
                userName: req.session.userName,  // Pass the userName from session
                products                         // Pass the fetched products to the view
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');  // Handle any errors
        }
    });
    app.post('/create-product', ctrl2.createProduct)
    app.post('/delete-product/:id/delete', ctrl2.deleteProduct)
}

module.exports = route