var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var locationWinSchema = new Schema({
    location : { type: Schema.Types.ObjectId, ref: 'LOCATION' },
    win_count : Number
});

var LocationWinner = mongoose.model('LOCATION_WIN', locationWinSchema);

// Export model so that we can use in imports
module.exports = LocationWinner;
