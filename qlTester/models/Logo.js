var mongoose = require("mongoose");
var TextSchema = require("../models/Text");
var ImageSchema = require("../models/Image");

var LogoSchema = new mongoose.Schema({
  id: String,
  owner: String,
  width: Number,
  height: Number,
  backgroundColor: String,
  borderRadius: Number,
  borderThickness: Number,
  borderColor: String,
  margin: Number,
  padding: Number,
  items: [mongoose.Schema.Types.Mixed],
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = {
  LogoSchema: LogoSchema,
  LogoModel: mongoose.model("Logo", LogoSchema),
};
// module.exports =  LogoSchema,
