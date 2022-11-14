const { Router } = require('express');
const { model } = require('mongoose');

const Game = require('../models/game');
const Gamer = require('../models/gamer');
const router = Router();


// Renderizado del hbs gameStatus
router.get('/', (req, res) => {
    res.render('gameStatus', {
        titulo: 'Juego de Dados',
        nombre: 'Michael Arango'
    });
});

/**
 *  Api para consultar el juego, estado y lista de jugadores
 * @gameid recibe por parametros el id del juego 
 */
router.get('/:gameid', (req, res) => {
    const gameid = req.params.gameid;

    Game.findById(gameid, (err, game) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` });
        if (!game) return res.status(404).send({ message: `El id del juego no existe` });

        Gamer.findById(game.gamers[0], (err, gamer1) => {
            Gamer.findById(game.gamers[1], (err, gamer2) => {
                Gamer.findById(game.gamers[2], (err, gamer3) => {

                    res.status(200).send({
                        id: game.id,
                        gamers: {

                            [game.gamers[0]]: {
                                id: game.gamers[0],
                                nombre: gamer1.nombre

                            },
                            [game.gamers[1]]: {
                                id: game.gamers[1],
                                nombre: gamer2.nombre
                            },
                            [game.gamers[2]]: {
                                id: game.gamers[2],
                                nombre: gamer3.nombre
                            }
                        },
                        inProgress: game.inProgress,

                        winner: {
                            id: game.gamers[2],
                            nombre: gamer3.nombre
                        }

                    });
                })
            })
        })
    })
});

/**
 * Api para consultar el ganador del juego
 * @gameid recibe por parametros el id del juego
 */
router.get('/:gameid/winner', (req, res, next) => {
    const gameid = req.params.gameid;

    Game.findById(gameid, (err, game) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` });
        if (!game) return res.status(404).send({ message: `El id del juego no existe` });

        Gamer.findById(game.gamers[2], (err, gamer) => {
            res.status(200).send({

                id: gamer.id,
                name: gamer.nombre

        })
    })
    })
})

module.exports = router;