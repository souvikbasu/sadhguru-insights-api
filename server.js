var mongoose = require('mongoose');
var express = require('express');
var app = express();
var videoInfo = require("./controllers/videoInfoController.js");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:admin@ds113749.mlab.com:13749/sadhguru')
    .then(() => console.log('Connected'))
    .catch((err) => console.error(err));

var cors=require('cors');
app.use(cors({origin:true,credentials: true}));
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', videoInfo);