// require express and other modules
var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose');

   // require Photo model
var Photo = require('./models/photo');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/ng_instagram');

app.get('*', function (req, res) {
  res.render('index');
});


// get all photos
app.get('/api/photos', function (req, res) {
	Photo.find(function(photos, err) {
		console.log(photos);
        res.json(photos);
    });
});

// create new photo
app.post('/api/photos', function (req, res) {
  // create new photo with form data (`req.body`)
  var newPhoto = new Photo(req.query);
  console.log(newPhoto);
  console.log(req.query);
    newPhoto.done = false;

    newPhoto.save(function(err, savedPhoto) {
        if (err) {
        	res.json(err);
        } else {
        	res.json(savedPhoto);
        }
        
    });
  // save new photo in db
});

// listen on port 3000
app.listen(3000, function() {
 console.log('server started');
});