const mongoose = require('mongoose');

const callCardSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    idCard: {type: String, required: true, unique: true},
    borrowDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    fine: {type: String},
    note: {type: String}
}, 
{ collection: 'callcards'})

const callCard = mongoose.model('callcard', callCardSchema)

module.exports = callCard