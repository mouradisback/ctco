const mongoose = require('mongoose')
const { Schema } = mongoose;

const depotSchema = new mongoose.Schema({

    created_at: { type: Date},
    modified_at: { type: Date},
    name: { type: String, required: true},
    address: { type: String},
    ref: { type: String, required: true},
    employee: { type: Schema.Types.ObjectId, ref: 'Employee'}

})

exports.Depot = mongoose.model('Depot', depotSchema)