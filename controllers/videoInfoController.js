var mongoose = require("mongoose");
var express = require('express');
var url = require('url');
var router = express.Router();
var VideoInfo = require('../models/VideoInfoModel');

router.post('/video', function (req, res, next) {
    var videoInfo = new VideoInfo(req.body);
    videoInfo.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("successfull");
            res.send({ message: "saved" })
        }
    });
});

router.get('/tags', function (req, res, next) {
    VideoInfo.find({ status: "A" }, { tags: 1, status: 1 },function (err, data) {  
        const dataArr = data.map(function (v) {
            return v['tags'];
        });
        const mergedArr = [].concat.apply([], dataArr);
        const uniqueArray = mergedArr.filter(function (item, pos) {
            return mergedArr.indexOf(item) === pos;
        });
        res.send(uniqueArray);
    });
});

router.get('/videos', function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query.tag;
    VideoInfo.find({ "tags": query }, function (err, data) {
        res.send(data);
    });
});

router.get('/all-videos', function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query.tag;
    VideoInfo.find(function (err, data) {
        res.send(data);
    });
});

router.get('/test', function (req, res, next) {
    console.log('api is running');
    res.send('Api is running');
});

module.exports = router;
