var mongoose = require('mongoose');
var express = require('express');
var app = express();
var router = express.Router();
var videoInfo = require("./controllers/videoInfoController.js");
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@ds113749.mlab.com:13749/sadhguru')
    .then(() => console.log('Connected'))
    .catch((err) => console.error(err));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())

// Save video info
app.use('/video', videoInfo);