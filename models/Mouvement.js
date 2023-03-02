const mongoose = require('mongoose')
const { Schema } = mongoose;

const mouvementSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    date: { type: Date},
    amount: { type: Number},
    motif: { type: String},
    source: { type: Schema.Types.ObjectId, ref: 'Caisse'},
    destination: { type: Schema.Types.ObjectId, ref: 'Caisse'}

})

exports.Mouvement = mongoose.model('Mouvement', mouvementSchema)