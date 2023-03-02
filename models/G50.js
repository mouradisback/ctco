const mongoose = require('mongoose')
const { Schema } = mongoose;

const g50Schema = new mongoose.Schema({

    created_at: { type: Date, default: Date.now()},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    birth_date: { type: Date},
    birth_place: { type: String},
    is_active: { type: Boolean},
    id_no: { type: String},
    driver_licence_no:{ type: String},
    social_security_no: { type: String},
    birth_certificate_no: { type: String},
    phone_personnal: { type: String},
    phone_professional: { type: String},
    email: { type: String},
    address: { type: String},
    photo_path: { type: String},
    marital_status: { type: String},
    rib: { type: String},
    bank: { type: String},
    ccp: { type: String},
    children_no: { type: Number},
    education: { type: String},
    entry_date: { type: Date},
    sortie_date: { type: Date},
    departement: { type: Schema.Types.ObjectId, ref: 'Departement'}

})

exports.G50 = mongoose.model('G50', g50Schema)