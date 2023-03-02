const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    name: { type: String, required: true},
    ref: { type: String, required: true},
    no: { type: Number },
    description: { type: String },
    unit: { type: String, required: true},
    stock_method: { type: String, required: true},
    type: { type: String, required: true},
    coeficient: { type: Number },
    purchase_price: { type: Number, required: true},
    sell_price: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true}

})

exports.Product = mongoose.model('Product', productSchema)