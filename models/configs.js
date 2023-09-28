const {Schema, model} = require('mongoose')

const configs = new Schema({
    isExam: {type: Boolean, required: true},
    dictionaryExpired: {type: Number},     // min: 5  | max: 15
    examExpired: {type: Number}            // min: 20 | max: 70
});

const configsModel = model('configs', configs);
module.exports = configsModel;
