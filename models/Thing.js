const mongoose = require('mongoose'); 

const thingSchema = mongoose.Schema({
    name: { type: String, required: false },
    manufacturer: { type: String, required: false },
    description: { type: String, required: false },
    ingredient: { type: String, required: false },
    heat: { type: Number, required: false },
    userId: { type: String, required: false },
    imageUrl: { type: String, required: false },
});

module.exports = mongoose.model('Thing', thingSchema);