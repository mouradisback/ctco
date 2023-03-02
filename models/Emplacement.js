const mongoose = require('mongoose')
const { Schema } = mongoose;

const emplacementSchema = new mongoose.Schema({

    created_at: { type: Date},
    modified_at: { type: Date},
    name: { type: String, required: true},
    ref: { type: String, required: true},
    depot: { type: Schema.Types.ObjectId, ref: 'Depot'}

})

exports.Emplacement = mongoose.model('Emplacement', emplacementSchema)