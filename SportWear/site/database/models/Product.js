
module.exports = (sequelize, DataTypes) => {
    
    const Product = sequelize.define('Product', {
        
        idProduct: {
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
        },
        idCategory: {
            type: DataTypes.INTEGER
        }
    },

    {
        timestamps : false,
        tableName : 'PRODUCTS'
    });
    
    Product.associate = function(models) {
        // associations can be defined here
        Product.belongsTo(models.Category, {
            as : "category",
            foreingKey : "idCategory"
        });
        Product.belongsToMany(models.ShoppingCart, {
            as : "cartProduct",
            through: "SHOPPING_CART_has_PRODUCTS",
            foreingKey : "idProducts",
            otherKey : "idSHOPPING_CART",
            timestamps : false
        });
    };
    
    return Product;
    
};