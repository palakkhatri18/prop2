// src/models/CartModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Card' }] // Reference to Card model
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
