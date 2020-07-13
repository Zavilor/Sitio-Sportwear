
module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define('Category', {
        
        idCategory: {
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
        Category.hasMany(models.Product, {
            as : "Products",
            foreingKey : "idCategory"
        });
    };
    
    return Category;
    
};