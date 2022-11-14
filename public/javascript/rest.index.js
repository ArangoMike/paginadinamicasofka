const enviar = document.getElementById('enviar');
var gamer1 = document.getElementById('gamer1');
var gamer2 = document.getElementById('gamer2');
var gamer3 = document.getElementById('gamer3');


/**
 * Evento de click y consumo de api para crear el juego
 * se pasa por body 3 nombres de jugadores
 */
enviar.addEventListener("click", function onclick() {
    var body = {
        "gamer1": gamer1.value,
        "gamer2": gamer2.value,
        "gamer3": gamer3.value
    }
    console.log(body)
    fetch('http://localhost:8080/createGame', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => document.getElementById("resultado").textContent = JSON.stringify(res, undefined, 5))
        .then(response => console.log("Exito", response))
        .catch(err => console.log(err));

});