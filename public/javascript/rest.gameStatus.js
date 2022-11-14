const enviar = document.getElementById('enviar');
var gameid = document.getElementById('gameid');
const sumbit = document.getElementById('sumbit');
var wgameid = document.getElementById('wgameid');

/**
 *  Evento de click y consumo de api para ver el estado del juego y sus jugadores
 * 
 * */
enviar.addEventListener("click", function onclick() {

    fetch('http://localhost:8080/game/' + gameid.value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => document.getElementById("resultado").textContent = JSON.stringify(res, undefined, 5))
        .then(response => console.log("Exito", response))
        .catch(err => console.log(err));

});

/**
 * Evento de click y consumo de api para ver el ganador del juego
 */
sumbit.addEventListener("click", function onclick() {

    fetch('http://localhost:8080/game/' + wgameid.value + '/winner', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => document.getElementById("wresultado").textContent = JSON.stringify(res, undefined, 5))
        .then(response => console.log("Exito", response))
        .catch(err => console.log(err));

});
