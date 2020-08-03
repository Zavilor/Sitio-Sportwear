
module.exports = (sequelize, DataTypes) => {
    
    const ShoppingCart = sequelize.define('ShoppingCart', {
        
        date: {
            type: DataTypes.DATE
        },
        Id: {
            type: DataTypes.INTEGER,
        },
        idProduct: {
            type: DataTypes.INTEGER
        },
        idUser: {
            type: DataTypes.INTEGER
        },  
        state: {
            type: DataTypes.STRING(20)
        },
        total: {
            type: DataTypes.INTEGER
        },
    },
    
    {
        timestamps : false,
        tableName : 'SHOPPING_CART'
    });
    
    ShoppingCart.associate = function(models) {
        // associations can be defined here
        ShoppingCart.belongsTo(models.User, {
            as : "user",
            foreignKey : "idUser"
        });
        ShoppingCart.belongsTo(models.Product, {
            as : "product",
            foreignKey : "idProduct"
        });
        /*ShoppingCart.belongsToMany(models.Product, {
            as : "productCart",
            through: "SHOPPING_CART_has_PRODUCTS",
            foreignKey : "idShoppingCart",
            otherKey : "idProductCart",
            timestamps : false
        });*/
    };
    
    return ShoppingCart;
    
};