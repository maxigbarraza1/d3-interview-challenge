const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.carsPath = '/api/cars';

        this.connectDB();

        //MIDDLEWARES
        this.middlewares();


        //RUTAS
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() )

        //Lectura y parse del body
        this.app.use( express.json() ) //Con este middleware se permite obtener los body de los JSON

        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.carsPath, require('../routes/car'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)	
        })
    }
}

module.exports = Server;