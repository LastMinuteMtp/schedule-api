var express = require ('express');
var mongoose = require ('mongoose');
require('mongoose-long')(mongoose);

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
  course: mongoose.Schema.Types.Long,
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

// var exampleSchedule = new Schedule({
//   course: 268438710,
//   stop_code: "JUSSIEUA",
//   stop_id: 11121,
//   stop_name: "A. L. JUSSIEU",
//   route_short_name: 10,
//   trip_headsign: "AIGUELONGUE",
//   direction: 1,
//   departure_time: "03:03:03",
//   is_theorical: 1
// });

// exampleSchedule.save(function (err) {
//   if (err) {
//     console.log ('Error on save!');
//   }
// });

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
