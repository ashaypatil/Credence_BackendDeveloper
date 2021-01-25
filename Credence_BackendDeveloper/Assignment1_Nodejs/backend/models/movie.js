const mongoose = require('mongoose');

//using mongoose schema to create movie model
const postSchema = mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    summary: { type: String, required: true }
});

module.exports = mongoose.model('Movie', postSchema);