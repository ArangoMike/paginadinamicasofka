const { Schema, model }  = require ('mongoose');
const jugador = require('./gamer');


const gameSchema = Schema({
    inProgress:{
        type: Boolean,
        default: false
    },
    type:{ 
        type: String,
        default: ""
    },

    gamers:[{
        type: Schema.Types.ObjectId,
        ref: jugador,
        required: true,
       
   
    }],

    winner:{
      type: Schema.Types.ObjectId,
      ref: 'jugador'
    }
    });

    module.exports = model('Game', gameSchema);