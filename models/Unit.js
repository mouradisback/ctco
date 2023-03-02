const mongoose = require('mongoose')
const { Schema } = mongoose;

const unitSchema = mongoose.Schema({
    
    name: { 
        type: String,
    },
    code: { 
        type: String,
        unique: true,
        required: true 
    },
    created_at: { 
        type: Date,
        default: Date.now()
    },
    modified_at: { 
        type: Date,
    }

})

exports.Unit = mongoose.model('Unit', unitSchema)