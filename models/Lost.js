const mongoose = require('mongoose')
const { Schema } = mongoose;

const lostSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    date: { type: Date},
    ref: { type: String },
    no: { type: Number },
    
    items: [{
        designation: { type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number},
    }],
    note: { type: String }

})

exports.Lost = mongoose.model('Lost', lostSchema)