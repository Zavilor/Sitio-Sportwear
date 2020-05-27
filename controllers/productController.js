module.exports = {

    product: function (req, res) {
        res.render ('../../site/productAdd')
    },

    carrito: function (req, res) {
        res.render ('../../site/views/auth/productCart')
    },

    detail: function (req, res) {
        res.render ('../../site/views/auth/productDetail')
    }
}