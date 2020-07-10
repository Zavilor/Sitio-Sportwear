
module.exports = (sequelize, DataTypes) => {
    
    const ShoppingCart = sequelize.define('ShoppingCart', {
        
        id: {
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
        }  
    },
    
    {
        timestamps : false,
        tableName : 'SHOPPING_CART'
    });
    
    ShoppingCart.associate = function(models) {
        // associations can be defined here
    };
    
    return ShoppingCart;
    
};