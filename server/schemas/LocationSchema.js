var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var locationSchema = new Schema({
    text : {type : String, required : true, index : true}, // Name of the location (currently matching text property for the wheel)
    level : {type : Number, min : 1, max : 3, required : true},
    // Ideally this map is a reference to the Map schema so we have a relationship
    // between a Map and locations, rather than be loosley based from strings
    map : {type : String},
    winner_message : {type : String, default : "You're going to Sunny...."},
    location_img : String, // Name of file not path to, as image should be within assets
    selected : {type : Boolean, default : false}, // If the location is apart of the default selection
    weighting : {type : Number, min : 0, max : 1, default : 1},
    img: {type : String, required: false}
});

var Location = mongoose.model('LOCATION', locationSchema);

// Export model so that we can use in imports
module.exports = Location;
