module.exports = {
    index: function (req, res) {
        res.render ('../../site/views/index')
    },

    register: function (req, res) {
        res.render ('../../site/views/auth/register')
    },

    login: function (req, res) {
        res.render ('../../site/views/auth/login')
    },
    
    product: function (req, res) {
        res.render ('../../site/productAdd')
    },

    carrito: function (req, res) {
        res.render ('../../site/views/auth/productCart')
    },

    detail: function (req, res) {
        res.render ('../../site/views/auth/productDetail')
    },



}