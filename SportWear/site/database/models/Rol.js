
module.exports = (sequelize, DataTypes) => {
    
    const Rol = sequelize.define('Rol', {
        
        idRol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripction: {
            type: DataTypes.STRING(50)
        }
    },

    {
        timestamps : false,
        tableName : 'ROLES'
    });
    
    Rol.associate = function(models) {
        // associations can be defined here
        /*Rol.hasMany(models.User, {
            as : "Users",
            foreingKey : "idRol"
        });*/
    };
    
    return Rol;
    
};