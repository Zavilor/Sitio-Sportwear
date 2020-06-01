module.exports = {

    register: function (req, res) {
        res.render ('../../site/views/auth/register')
    },

    login: function (req, res) {
        res.render ('../../site/views/auth/login')
    },
}
    