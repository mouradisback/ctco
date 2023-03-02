const mongoose = require('mongoose')
const { Schema } = mongoose;

const contractSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    type: { type: String, required: true},

    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    salary: { type: Number},
   
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    fonction: { type: Schema.Types.ObjectId, ref: 'Fonction', required: true}

})

exports.Contract = mongoose.model('Contract', contractSchema)