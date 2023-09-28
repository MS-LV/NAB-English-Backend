const {Schema, model} = require('mongoose');
const moment = require('moment-timezone');

const histories = new Schema({
    group: {type: String, required: true},
    block: {type: String, required: true},
    user: {type: Object, required: true},
    data: {type: Array, default: []},
    type: {type: String, default: 'everyday'},
    isExpired: {type: Boolean, default: false}
}, {timestamps: true});

const historiesModel = model('histories', histories);

module.exports = historiesModel;