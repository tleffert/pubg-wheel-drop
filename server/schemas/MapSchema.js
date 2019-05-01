var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var mapSchema = new Schema({
  name: {type: String, required: true}
});

var Map = mongoose.model('MAP', mapSchema);

// Export model so that we can use in imports
module.exports = Map;
