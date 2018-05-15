var mongoose = require('mongoose');
var videoSchema = new mongoose.Schema({
    url: String,
    tags: Array,
    time: String,
    status: {type : String, default : "A"},
});

module.exports = mongoose.model('video_info', videoSchema);