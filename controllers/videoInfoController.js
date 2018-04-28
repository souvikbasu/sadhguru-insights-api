var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var VideoInfo = require('../models/VideoInfoModel');

router.post('/video', function (req, res, next) {
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

router.get('/video', function (req, res, next) {
    VideoInfo.find(function (err, data) {
        res.send(data);
    });
});

router.post('/videosbytag', function (req, res, next) {
    //PersonModel.find({ "favouriteFoods.name": "Sushi" });
    let tag = req.body.tag
    VideoInfo.find({ "tags": tag }, function (err, data) {
        res.send(data);
    });
    //res.send('Api is running');
});

router.get('/test', function (req, res, next) {
    console.log('api is running');
    res.send('Api is running');
});

module.exports = router;
