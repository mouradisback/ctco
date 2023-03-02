const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({

    created_at: { type: Date},
    modified_at: { type: Date},
    title: { type: String, required: true},
    series: { type: String},
    sub_title: { type: String},
    author: { type: String},
    image_url_front: { type: String},
    image_url_back: { type: String},
    isbn: { type: String},
    published_year: { type: String},
    publisher: { type: String},
    description: { type: String},


})

exports.Book = mongoose.model('Book', bookSchema)