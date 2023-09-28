const {Schema, model} = require('mongoose');

const Dictionary = new Schema({
    level: {type: String, default: 'beginner'},
    block: {type: String, required: true},
    english: {type: String, required: true},
    russian: {type: String, required: true},
    tajik: {type: String, required: true},
});

module.exports = model('dictionaries', Dictionary);