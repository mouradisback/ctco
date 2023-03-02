const mongoose = require('mongoose')
const { Schema } = mongoose;

const pricelistSchema = new mongoose.Schema({

    created_at: { type: Date},
    modified_at: { type: Date},
    type: { type: String },
    date: { type: Date, required: true },
    ref: { type: String, required: true },
    status: { type: String },
    order: { type: Number },
    supplier_ref: { type: String },
    price_validity: { type: String },
    attached_file_url: { type: String },
    items: [],
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier'}
    

})

exports.Pricelist = mongoose.model('Pricelist', pricelistSchema)