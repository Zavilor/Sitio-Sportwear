module.exports = {

    register: function (req, res) {
        res.render ('../../site/views/auth/register')
    },

    newUser: function (req, res) {
        let name = req.body.name;
        res.send('Usuario ' + name + ' registrado con exito');  
    },

    login: function (req, res) {
        res.render ('../../site/views/auth/login')
    },

    loginExistingUser: function(req, res){
        let email = req.body.email;
        res.send('Usuario ' + email + ' se ha logueado con éxito');
    }
}
    