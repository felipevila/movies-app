const express = require('express');
const nunjucks = require('nunjucks');
const axios = require('axios');
const service = require('./api.js');
const app = express();

let movies, results;
let featured = ["", "", "", "", "", ""];
const featuredIds = [3314,4751,1365,1993,3274,997];

// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 8000);

app.use(express.static('assets'));


// Get movies data from endpoint
service.getMovies(function(resp) {
    movies = resp.data.data.movies;
});

// Get featurted movies IDs
for (let i = 0; i < featuredIds.length; i++) {
    service.getMovieById(featuredIds[i], function(resp) {
        featured[i] = resp.data.data.movie;
    });
}

// Home page
app.get('/', function(req, res) {
    res.render('index.html', {
        movies,
        featured,
    });
});

// Movie detail
app.get('/movie/:id', function (req, res) {
    service.getMovieById(req.params.id, function(response) {
        res.render('movie.html', {
            singleMovie: response.data.data.movie,
        });
    });
});

// Search Results
app.get('/results', function(req, res) {
    service.getMovieByTerm(req.query.s, function(response) {
        results = response.data.data.movies;
        res.render('results.html', {
            results,
        });
    });
});

// Search Results with Filter
app.get('/results', function(req, res) {
    service.getMovieByTerm(req.query.searchField, function(response) {
        filteredResults = response;
        res.render('results.html', {
            filteredResults,
        });
    });
});

// Start server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});