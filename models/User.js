const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    created_at: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    permissions: [

    ],
    employee:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    }
})

exports.User = mongoose.model('User', userSchema)