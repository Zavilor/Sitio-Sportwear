module.exports = {

    create: function (req, res) {
        res.render ('../../site/views/product/create')
    },

    cart: function (req, res) {
        res.render ('../../site/views/product/productCart')
    },

    detail: function (req, res) {
        res.render ('../../site/views/product/productDetail')
    },

    productList: function (req, res) {
        res.render ('../../site/views/product/productList')
    }
}
