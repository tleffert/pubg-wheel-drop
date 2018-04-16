var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var streamerSchema = new Schema({
    name : {type : String, required : true},
    twitchId : {type : String, required : true},
    status : String
});

streamerSchema.methods.isLive = function() {
    if(this.status && this.status === 'live') {
        return true;
    }
    return false;
}

var Streamer = mongoose.model('STREAMER', streamerSchema);

// Export model so that we can use in imports
module.exports = Streamer;
