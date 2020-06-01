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

    create : function (product) {
        let array = this.findAll();
        //le asigno el ultimo id
        product.id = this.lastID();
        //meto la pelicula
        array.push(product);
        //convertir a json ese array con la peli nueva
        jsonData = JSON.stringify(array, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    },

    lastID : function (){
        let array = this.findAll();
        let lastID = 0;
        for (product of array) {
            if (lastID < movie.id) {
                lastID = movie.id;
            }
        }
        return lastID + 1;
    },

    filterByTitle : function (title){
        let array = this.findAll();
        //filtramos los datos
        return array.filter(function(movie) {
            //hago que ambos string sean minusculas con .toLowerCase()
            //tambien para filtrar y que contenga en cualquier parte esa palabra que me pasaron "title"
            //para que funcione aplicamos una expresion regular, muy sencilla y facil
            search = new RegExp(title.toLowerCase())
            //luego aplicamos el search para hacer una busqueda de esas letras dentro del titulo de cada pelicula, retornara -1 si no la encuentra
            return movie.title.toLowerCase().search(search) >= 0;
        });
    }
}

module.exports = movieData;
