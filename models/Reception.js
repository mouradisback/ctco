const mongoose = require('mongoose')
const { Schema } = mongoose;

const receptionSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    date: { type: Date},
    ref: { type: String },
    no: { type: Number },
    
    items: [],
    note: { type: String }


})

exports.Reception = mongoose.model('Reception', receptionSchema)