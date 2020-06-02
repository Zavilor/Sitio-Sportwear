const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/products.json');

let productData = {
    
    findAll : function () {
        // verificamos si el archivo existe
        if (!fs.existsSync(fileData)){
            fs.writeFileSync(fileData, '');
        }
        // leemos el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertimos el json a un array, mientras validamos que existan datos

        let products = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return products;
    },
}

module.exports = productData;
