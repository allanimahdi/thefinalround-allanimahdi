var mongoose = require('../config/db.js');

var BookSchema = mongoose.Schema({
    name: String,
    author: String,
    publication_year: Number,
    description: String,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Book', BookSchema);