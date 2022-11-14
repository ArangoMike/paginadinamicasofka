const { Router } = require('express');
const { model } = require('mongoose');

const Game = require('../models/game');
const Gamer = require('../models/gamer');
const router = Router();

// Renderizado del hbs index
router.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Juego de Dados',
        nombre: 'Michael Arango'
    });
});

/**
 * Api para la creación del juego
 * recibe por body los nombres de 3 jugadores para crear el juego
 */
router.post('/', (req, res = response) => {
    const { gamer1, gamer2, gamer3 } = req.body;

    const jugador1 = new Gamer({ "nombre": gamer1 });
    const jugador2 = new Gamer({ "nombre": gamer2 });
    const jugador3 = new Gamer({ "nombre": gamer3 });

    // Guardar en base de datos
    jugador1.save();
    jugador2.save();
    jugador3.save();

    const game = new Game({
        inprogress: true,
        gamers: [
            jugador1,
            jugador2,
            jugador3
        ]
    });
    game.save()
        .then(data => {
            res.status(201).json({
                id: data.id,
                type: data.type,
                gamers: [jugador1.nombre,
                jugador2.nombre,
                jugador3.nombre
                ]
            })
        })
        .catch(err => { console.log(err) })

});

module.exports = router;