const mongoose = require('mongoose')
const { Schema } = mongoose;

const schoolSchema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    modified_at: { type: Date},
    date_activity_start: { type: Date},
    name: { type: String, required: true},
    slogan: { type: String},
    agreement_no: { type: String},
    address: { type: String},
    tel_landline: { type: String},
    tel_mobile: { type: String},
    tel_fax: { type: String},
    email: { type: String},
    website: { type: String},
    bank_name: { type: String},
    bank_account_no: { type: String},
    rc: { type: String},
    nif: { type: String},
    nis: { type: String},
    ai: { type: String}

})

exports.School = mongoose.model('School', schoolSchema)