const Product = require('../models/product')

const createProduct = async(req, res) => {
    const response = await Product.create(req.body)
    res.redirect('/admin')
}

const deleteProduct = async(req, res) => {
    const {id} = req.params
    const response = await Product.findByIdAndDelete(id)
    console.log(response)
    res.redirect('/admin')
}
module.exports = {
    createProduct,
    deleteProduct
}