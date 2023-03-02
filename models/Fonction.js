const mongoose = require('mongoose')
const { Schema } = mongoose;

const fonctionSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    name: { type: String, required: true, unique: true},
    salary_coef: { type: Number, required: true},

})

exports.Fonction = mongoose.model('Fonction', fonctionSchema)