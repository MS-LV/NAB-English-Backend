const {Schema, model} = require('mongoose');

const Reading = new Schema({
    level: {type: String, default: 'beginner'},
    block: {type: String, required: true},
    description: {type: String, required: true},
    answer: {type: String, required: true},
    option: {type: String, required: true},
    text: {type: String, default: '<br>'}
});

module.exports = model('readings', Reading);