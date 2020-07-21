
module.exports = (sequelize, DataTypes) => {
    
    const ShoppingCart = sequelize.define('ShoppingCart', {
        
        idShoppingCart: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE
        },
        state: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.INTEGER
        },
        idUser: {
            type: DataTypes.INTEGER
        }  
    },
    
    {
        timestamps : false,
        tableName : 'SHOPPING_CART'
    });
    
    ShoppingCart.associate = function(models) {
        // associations can be defined here
        ShoppingCart.belongsTo(models.User, {
            as : "Usuario",
            foreingKey : "idUser"
        });
        ShoppingCart.belongsToMany(models.Product, {
            as : "cartProduct",
            through: "SHOPPING_CART_has_PRODUCTS",
            foreingKey : "idProducts",
            otherKey : "idShoppingCart",
            timestamps : false
        });
    };
    
    return ShoppingCart;
    
};