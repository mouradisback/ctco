const mongoose = require('mongoose')
const { Schema } = mongoose;

const purchaseSchema = new mongoose.Schema({

    created_at: { type: Date},
    modified_at: { type: Date},
    type: { type: String },
    date: { type: Date, required: true },
    ref: { type: String, required: true, unique: true },
    delivery_date: { type: Date},
    status: { type: String },
    order: { type: Number },
    supplier_ref: { type: String },
    total_ttc: { type: Number },
    total_ht: { type: Number },
    total_tva: { type: Number },
    total_timbre: { type: Number },
    total_discount: { type: Number },
    total_other_taxes: { type: Number },
    tva_value: { type: Number },
    timbre_value: { type: Number },
    discount_value: { type: Number },
    other_taxes_value: { type: Number },
    tva_type: { type: String },
    timbre_type: { type: String },
    discount_type: { type: String },
    other_taxes_type: { type: String },
    payement_method: { type: String },
    items: [],
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier'},
    main_purchase: { type: Schema.Types.ObjectId, ref: 'Purchase', default: null},
    next_purchase: { type: Schema.Types.ObjectId, ref: 'Purchase', default: null},
    previous_purchase: { type: Schema.Types.ObjectId, ref: 'Purchase', default: null},

})

exports.Purchase = mongoose.model('Purchase', purchaseSchema)