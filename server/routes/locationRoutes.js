var express = require('express');


var Location  = require('../schemas/LocationSchema');
var LocationWinner  = require('../schemas/LocationWinSchema');
var Map =  require('../schemas/MapSchema');

module.exports = function(parentRoute) {
    var locationRouter = express.Router();

    parentRoute.use('/maps', locationRouter);

    // Returns list of all maps
    locationRouter.get('/', function(req, res){
        Map.find()
        .then(function(maps){
            res.json(maps).end();
        })
    });

    // Returns list of all locations of a specific map
    locationRouter.get('/:map/locations', function(req, res){
        Location.find({"map": req.params.map})
        .then(function(mapLocations){
            res.json(mapLocations).end();
        })
    });

    locationRouter.post('/winner/:locationId', function(req, res) {
        console.log(req.params.locationId);
        console.log("THIS IS THE WINNER");
        LocationWinner.findOneAndUpdate({
            '_id' : req.params.locationId},
            {location : req.params.locationId, '$inc' : {'win_count' : 1}},
            {'upsert' : true}
        )
        .then(function(response){
            res.end();
        })
        .catch(function(error){
            console.log(error);
        })
    })
}
