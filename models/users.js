const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model
const UserSchema = new Schema({
    name: {type: String, required: true},
    surename: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    role: {type: String, default: 'STUDENT'},
    level: {type: String, default: 'beginner'}
});
const usersModel = model('Users', UserSchema);
module.exports = usersModel;