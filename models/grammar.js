const {model, Schema} = require('mongoose');

const Grammars = new Schema({
    level: {type: String, default: 'beginner'},
    block: {type: String, required: true},
    description: {type: String, required: true},
    answer: {type: String, required: true},
    option: {type: String, required: true}
});

module.exports = model('grammars', Grammars);