var express = require('express');


var Location  = require('../schemas/LocationSchema');
var LocationWinner  = require('../schemas/LocationWinSchema');

module.exports = function(parentRoute) {
    var locationRouter = express.Router();

    parentRoute.use('/location', locationRouter);

    locationRouter.get("/list/:map", function(req, res){
        console.log(req.params.map);
        Location.find({map : req.params.map})
        .then(function(locations){
            res.json(locations).end();
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
