var express = require('express');
var request = require('request-promise');
var StreamerSchema  = require('../schemas/StreamSchema');
var Promise = require("bluebird");

module.exports = function(parentRoute) {
    var liveRouter = express.Router();
    var streamLive = [

    ];

    StreamerSchema.count()
    .then(count => {
        if(!count) {
            StreamerSchema.insertMany([
                {name : 'will', twitchId : '309519', status : ''},
                {name : 'mike', twitchId : '27489883', status : ''},
                {name : 'frank', twitchId : '159582594', status : ''},
                {name : 'trevor', twitchId : '12378292', status : ''}
            ]);
        }
    });

    checkLive();

    function checkLive() {
        StreamerSchema.find()
        .then(streamers => {
            var checkLiveRequests = {};
            streamers.forEach(streamer => {
                var options = {
                    uri : 'https://api.twitch.tv/helix/streams?user_id=' + streamer.twitchId,
                    method : 'GET',
                    headers : {
                        'Client-ID' : ''
                    }
                }
                checkLiveRequests[streamer.name] = request(options);
            });
            Promise.props(checkLiveRequests)
            .then(response => {
                var streamerNames = Object.keys(response);
                streamerNames.forEach(name => {
                    var jsonResponse = JSON.parse(response[name]);
                    if(jsonResponse && jsonResponse.data[0] != undefined) {
                        StreamerSchema.findOneAndUpdate({
                           name : name
                       },
                       {
                           status : jsonResponse.data[0].type
                       })
                       .then(data =>{
                           console.log(data);
                       })
                    } else {
                        StreamerSchema.findOneAndUpdate({
                                   name : name
                               },
                               {
                                   status : ''
                               })
                               .then(data => {
                                   console.log(data);
                               })
                    }
                });
            })
            .catch(error => {
                console.log(error);
            })
        });
    }



    parentRoute.use('/live', liveRouter);

    // Verifies hook
    liveRouter.get('/stream-handler', (req, res) => {
        console.log("verifying hook", req.query['hub.topic']);
        res.status(200).end(req.query['hub.challenge']);
    });

    // Listens for hook
    liveRouter.post('/stream-handler', (req, res) => {
        var streamerTwichStatus = req.body.data[0];
        StreamerSchema.findOneAndUpdate({
            twitchId : streamerTwichStatus.user_id
        },
        {
            status : streamerTwichStatus.status
        })
        .then(response => {
            res.end();
            //TODO notify client stream status is updated
        })
        .catch(error => {
            // do something with the error?
        })
    });

    liveRouter.get('/checkLive', (req, res) => {
        checkLive();
        res.end();
    })

    // TODO move logic to service
    liveRouter.get('/streamer-status', (req, res) => {
        StreamerSchema.find()
            .then(streamers => {
                var streamerStatus = [];
                streamers.forEach(streamer => {
                    streamerStatus.push({
                        name : streamer.name,
                        isLive : streamer.isLive()
                    });
                });
                res.send(streamerStatus).end();
            });
    });

}
