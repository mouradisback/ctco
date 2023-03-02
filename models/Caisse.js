const mongoose = require('mongoose')
const { Schema } = mongoose;

const caisseSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    name: { type: String, required: true},
    description: { type: String},
    initial_amount: { type: Number},
    solde: { type: Number},
    employee: { type: Schema.Types.ObjectId, ref: 'Employee'}

})

exports.Caisse = mongoose.model('Caisse', caisseSchema)