const mongoose = require('mongoose')
const { Schema } = mongoose;

const payementSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    date: { type: Date},
    amount: { type: Number},
    type: { type: String },
    method: { type: String },
    cheque_no: { type: String },
    virement_no: { type: String }, 
    caisse: { type: Schema.Types.ObjectId, ref: 'Caisse'},
    bank: { type: Schema.Types.ObjectId, ref: 'Bank' },
    purchase: { type: Schema.Types.ObjectId, ref: 'Purchase' },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' }
    
})

exports.Payement = mongoose.model('Payement', payementSchema)