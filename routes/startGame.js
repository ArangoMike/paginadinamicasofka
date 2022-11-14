const { Router } = require('express');

const Game = require('../models/game');
const router = Router();

// Renderizad del hbs startGame
router.get('/', (req, res) => {
    res.render('startGame', {
        titulo: 'Juego de Dados',
        nombre: 'Michael Arango'
    });
});

/**
 * Api para ingresar las apuestas de cada jugador
 * recibe por body el id de juego y la apuesta de los 3 jugadores
 */
router.post('/', (req, res) => {

    const { gameId, gamerBet1,
        gamerBet2,
        gamerBet3 } = req.body;

    Game.findById(gameId, (err, game) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` });
        if (!game) return res.status(404).send({ message: `El id del juego no existe` });

        res.status(200).json({
            id: game.id,
            type: game.type,
            gamerBet: {
                [game.gamers[0]]: gamerBet1,
                [game.gamers[1]]: gamerBet2,
                [game.gamers[2]]: gamerBet3

            }
        })
    })
})


module.exports = router;