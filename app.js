var express = require ('express');
var mongoose = require ('mongoose');

var app = express();

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/lm';

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

var scheduleSchema = new mongoose.Schema({
  course: mongoose.Schema.Types.Mixed,
  stop_code: String,
  stop_id: String,
  stop_name: String,
  route_short_name: String,
  trip_headsign: String,
  direction: Number,
  departure_time: String,
  is_theorical: Number
});

var Schedule = mongoose.model('lines', scheduleSchema);

app.get('/schedule/:parameter/:value', function (req, resp) {
  var query = Schedule.find({});
  query.where(req.params.parameter).equals(decodeURIComponent(req.params.value));
  query.exec(function (err, result) {
    if (!err) {
      resp.send(result);
    }
    else {
      resp.send('Error in query: ' + err);
    }
  });
});

app.get('/', function (req, resp) {
  Schedule.find({stop_name: "ANATOLE FRANCE"}).exec(function (err, result) {
    if (!err) {
      resp.send(result);
    }
    else {
      resp.send('Error in query: ' + err);
    }
  });
});

var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
