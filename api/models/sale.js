const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    customer: {
        type: String
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Sale', saleSchema);