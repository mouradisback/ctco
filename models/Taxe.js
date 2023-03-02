const mongoose = require('mongoose')
const { Schema } = mongoose;

const taxeSchema = mongoose.Schema({
    
    name: { 
        type: String,
        unique: true,
        required: true 
    },
    value: { 
        type: Number,
        required: true 
    },
    created_at: { 
        type: Date,
        default: Date.now()
    },
    modified_at: { 
        type: Date,
    },
    account:{
        type: Schema.Types.ObjectId, ref: 'Account'
    }

   

})

exports.Taxe = mongoose.model('Taxe', taxeSchema)