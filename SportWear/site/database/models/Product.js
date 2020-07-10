
module.exports = (sequelize, DataTypes) => {
    
    const Product = sequelize.define('Product', {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(500)
        },
        image: {
            type: DataTypes.STRING(50)
        },
        price: {
            type: DataTypes.INTEGER
        }
        
    },

    {
        timestamps : false,
        tableName : 'PRODUCTS'
    });
    
    Product.associate = function(models) {
        // associations can be defined here
    };
    
    return Product;
    
};