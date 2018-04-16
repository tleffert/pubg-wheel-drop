var express = require('express');
var request = require('request-promise')
var StreamerSchema  = require('./schemas/StreamSchema');

module.exports = function(app){
    var apiRouter = express.Router();
    // API router, used to catch all routes that re prepended with '/api'
    app.use('/api', apiRouter);

    require('./routes/locationRoutes.js')(apiRouter);
    require('./routes/streamLiveRoutes.js')(apiRouter);

    var ids = {will : 309519, mike : 27489883, frank : 159582594, trevor : 12378292 }

    var hookOptions = {
        uri : 'https://api.twitch.tv/helix/webhooks/hub',
        method : 'POST',
        headers : {
            'Client-ID' : ''
        },
        body : {
            'hub.callback' : 'http://wheel.church/api/live/stream-handler',
            'hub.mode' : 'subscribe',
            'hub.topic' : 'https://api.twitch.tv/helix/streams?user_id=',
            "hub.lease_seconds":"0",
        },
        json : true
    };

    var hookReqeusts = [];

    // For now just the 4 of us
    // StreamerSchema.find()
    // .then(streamers => {
    //     streamers.forEach(streamer => {
    //         var options = Object.assign({}, hookOptions);
    //         options.body['hub.topic'] = "https://api.twitch.tv/helix/streams?user_id=" + streamer.twitchId;
    //         hookReqeusts.push(request(options));
    //     });
    //     requestHooks(hookReqeusts);
    // });

    function requestHooks(requests) {
        Promise.all(hookReqeusts)
        .then(response => {
            console.log("STARTING HOOK");
        })
        .catch(error => {
            console.log("error");
            // console.log(error);
        });
    }


}
