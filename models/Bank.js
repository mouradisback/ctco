const mongoose = require('mongoose')
const { Schema } = mongoose;

const bankSchema = new mongoose.Schema({

    created_at: { type: Date},
    modified_at: { type: Date},
    name: { type: String, required: true},
    address: { type: String},
    account_no: { type: Number},
    initial_solde: { type: Number},

})

exports.Bank = mongoose.model('Bank', bankSchema)