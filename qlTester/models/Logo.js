var mongoose = require('mongoose');
var TextSchema = require("../models/Text");
var ImageSchema = require("../models/Image");

var LogoSchema = new mongoose.Schema({
  id: String,
  texts: [TextSchema],
  Images :[ImageSchema],
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = LogoSchema;