const { Schema, model }  = require ('mongoose');


const jugadorSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
});

module.exports = model('Gamer', jugadorSchema);