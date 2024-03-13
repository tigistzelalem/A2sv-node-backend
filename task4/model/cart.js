const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        }
    ],
    quantities: [Number]
});

module.exports = mongoose.model('Cart', cartSchema);
