
module.exports = (sequelize, DataTypes) => {
    
    const Rol = sequelize.define('Rol', {
        
        id: {
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
    };
    
    return Rol;
    
};