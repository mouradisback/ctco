const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema({
    
    name: { 
        type: String,
        unique: true,
        required: true 
    },
    created_at: { 
        type: Date,
        default: Date.now()
    },

    account_ref: { 
        type: String,
        unique: true,
        required: true 
        
    },
    order: { 
        type: Number,
        unique: true,
        required: true, 
    },
    
    address: {type: String},
    business_area: {type: String},
    tel: {type: String},
    email: {type: String},
    website: {type: String},
    
    bank_name: {type: String},
    bank_account_no: {type: String},

    rc: {type: String},
    nif: {type: String},
    nis: {type: String},
    ai: {type: String},

})

exports.Supplier = mongoose.model('Supplier', supplierSchema)