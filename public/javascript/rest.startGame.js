const enviar = document.getElementById('enviar');
var gameId = document.getElementById('gameId')
var gamer1 = document.getElementById('gamer1');
var gamer2 = document.getElementById('gamer2');
var gamer3 = document.getElementById('gamer3');

/**
 * Evento de click y consumo de api para empezar el juego 
 * e ingresar las apuestas de cada jugador.
 * 
 * Recibe por body el id del juego, y la apuesta de los 3 jugadores
 */
enviar.addEventListener("click", function onclick() {
    var body = {
        "gameId": gameId.value,
        "gamerBet1": gamer1.value,
        "gamerBet2": gamer2.value,
        "gamerBet3": gamer3.value
    }

    fetch('http://localhost:8080/startGame', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => document.getElementById("resultado").textContent = JSON.stringify(res, undefined, 5 ))
        .then(response => console.log("Exito", response))
        .catch(err => console.log(err));

});