const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    modified_at: { type: Date},
    name: { type: String, required: true, unique: true},
    code: { type: String},
    description: { type: String},
    stock_method: { type: String},
    unit: { type: String},
    coeficient: { type: Number},
    type: { type: String},
    parent_category: { type: Schema.Types.ObjectId, ref: 'Category', default: null}

})

exports.Category = mongoose.model('Category', categorySchema)