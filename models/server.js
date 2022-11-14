require('dotenv').config();
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const startGame = require('../routes/startGame');
const index = require('../routes/index');
const gameStatus = require('../routes/gameStatus')

const { dbConnection } = require('../database/config');

/**
 * Creación de la clase Server
 */
class Server {


    constructor() {
        this.app = express();

        this.port = process.env.PORT;


        //handlebars - view engine setup
        this.app.set('view engine', 'hbs');


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación        
        this.routes();
    };

    
    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }
    
    routes() {
    
        this.app.use('/createGame', index);
        this.app.use('/game', gameStatus);
        this.app.use('/game', gameStatus);
        this.app.use('/startGame', startGame);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;