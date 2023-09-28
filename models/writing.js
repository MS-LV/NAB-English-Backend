const {model, Schema} = require('mongoose');

const Writing = new Schema({
    level: {type: String, default: 'beginner'},
    block: {type: String, required: true},
    theme: {type: String, required: true},
});

module.exports = model('writings', Writing);