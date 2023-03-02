const mongoose = require('mongoose')
const { Schema } = mongoose;

const departementSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    modified_at: { type: Date},
    name: { type: String, required: true, unique: true},
    code: { type: String},

})

exports.Departement = mongoose.model('Departement', departementSchema)