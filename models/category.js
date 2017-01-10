var mongoose = require('../config/db.js');

var CategorySchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Category', CategorySchema);