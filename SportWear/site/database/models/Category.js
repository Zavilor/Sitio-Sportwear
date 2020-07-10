
module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define('Category', {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(20)
        }
    },
    
    {
        timestamps : false,
        tableName : 'CATEGORIES'
    });
    
    Category.associate = function(models) {
        // associations can be defined here
    };
    
    return Category;
    
};