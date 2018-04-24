var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var VideoInfo = require('../models/VideoInfoModel');
var VideoInfoController = {};

router.post('/save', function (req, res, next) {
    console.log(req.body);
    console.log("running");
    var videoInfo = new VideoInfo(req.body);
    videoInfo.save(function (err) {
        if (err) {
            console.log(err);

        } else {
            console.log("successfull");
            res.send({message : "saved"})
        }
    });
});

router.get('/getVideos', function (req, res, next) {
    VideoInfo.find(function (err, data) {
        res.send(data);
    });
});

router.get('/test', function (req, res, next) {
    console.log('api is running');
});

module.exports = router;