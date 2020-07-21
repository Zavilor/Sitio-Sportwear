
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
        Category.belongsTo(models.Product, {
            as : "product",
            foreingKey : "idCategory"
        });
    };
    
    return Category;
    
};