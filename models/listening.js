const {Schema, model} = require('mongoose');

const Listening = new Schema({
    level: {type: String, default: 'beginner'},
    block: {type: String, required: true},
    description: {type: String, required: true},
    answer: {type: String, required: true},
    option: {type: String, required: true}
});

module.exports = model('listenings', Listening);