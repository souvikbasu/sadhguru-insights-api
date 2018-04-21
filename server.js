var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;
var cors = require('cors');

var VIDEO_COLLECTION = "videos";

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});



// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  heartbeat
 */
app.get("/", function(req, res) {
    res.status(200).json({message: "Welcome to Sadhguru Insights API!"});
});


// VIDEO API ROUTES BELOW

/*  "/api/videos"
 *    GET: find trip matching id
 */
app.get("/api/videos", function(req, res) {
    db.collection(VIDEO_COLLECTION).find({}, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get all videos");
      } else {
        res.status(200).json(doc);
      }
    });
});
