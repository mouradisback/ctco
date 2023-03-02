const mongoose = require('mongoose')
const { Schema } = mongoose;

const purchaseHeaderSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    

})

exports.PurchaseHeader = mongoose.model('PurchaseHeader', purchaseHeaderSchema)