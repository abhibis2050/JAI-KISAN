const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const cardSchema = new mongoose.Schema({
    cardNumber: { type: String,default:"C001"},
    cardType: { type: String },
    customerName: { type: String },
    status: { type: String, default: "Active" },
    vision: { type: String },
    customerId: { type: ObjectId, ref: "customer" }


}, { timestamps: true })

module.exports = mongoose.model('Card', cardSchema)
