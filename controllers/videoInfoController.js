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
            res.send({ message: "saved" })
        }
    });
});

router.get('/tags', function (req, res, next) {
    VideoInfo.find({ status: "A" }, { tags: 1, status: 1 },function (err, data) {  
        if (err) {
            res.status(404).send(err);
            return;
        }
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
    var queryId = url_parts.query._id;
    if(query == ''){
        VideoInfo.find({ 'status': 'A' },function (err, data) {
            if (err) {
                res.status(404).send(err);
                return;
            }
            res.send(data);
        });
    }
    else if (queryId != undefined) {
        VideoInfo.find({ "_id": queryId, 'status': 'A' }, function (err, data) {
            if (err) {
                res.status(404).send(err);
                return;
            }
            res.send(data);
        });
    }
    else{
        VideoInfo.find({ "tags": query, 'status': 'A' }, function (err, data) {
            if (err) {
                res.status(404).send(err);
                return;
            }
            res.send(data);
        });
    }    
});

router.put('/videos', function (req, res, next) {
    VideoInfo.update({ '_id': req.body._id }, {
        '$set': {
            url: req.body.url,
            tags: req.body.tags,
            time: req.body.time,
        }
    }, function (err, doc) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send({ message: "updated" })
    })
});

router.delete('/videos', function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var queryId = url_parts.query._id;
    VideoInfo.findOneAndUpdate({ '_id': queryId }, {
        '$set': {
            status: "I",
        }
    }, function (err, doc) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.status(200).send({ message: "deleted" })
    })
});

router.get('/test', function (req, res, next) {
    console.log('api is running');
    res.send('Api is running');
});

module.exports = router;
