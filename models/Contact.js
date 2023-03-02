const mongoose = require('mongoose')
const { Schema } = mongoose;

const contactSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String},
    position: { type: String},
    phone: { type: String},
    
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true},

})

exports.Contact = mongoose.model('Contact', contactSchema)