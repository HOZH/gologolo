var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
  id: String,
  texts: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 0, max: 150 },
  borderThickness: { type: Number, min: 0, max: 150 },
  margin: { type: Number, min: 0, max: 60 },
  padding: { type: Number, min: 0, max: 60 },
  zOrder: Number,
  xPosition: Number,
  yPosition: Number
});

module.exports = TextSchema;