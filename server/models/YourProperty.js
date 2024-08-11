// src/models/Property.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  BHK: { type: String, required: true }, 
  status: { type: String, default: null }, 
  area: { type: String, default: null }, 
  tower: { type: String, default: null }, 
  floor: { type: String, default: null }, 
  demand: { type: String, default: null }, 
  partyName: { type: String, default: null }, 
  partyContact: { type: String, required: true },
  society: {type: String, required: true},
  category: {type: String, required: true},
  query: {type: String, default: null},
  date: { type: Date, default: null }, 
});

const Property = mongoose.model('Property', itemSchema);

module.exports = Property;
