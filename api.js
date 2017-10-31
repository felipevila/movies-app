const axios = require('axios');

module.exports = {
  getMovies: function(cb) {
    axios.get('https://yts.ag/api/v2/list_movies.json?sort_by=year')
    .then(function(response) {
      cb(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getMovieById: function(id, cb) {
    axios.get('https://yts.ag/api/v2/movie_details.json?movie_id=' + id + '&with_images=true')
    .then(function(response) {
      cb(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getMovieByTerm: function(term, cb) {
    axios.get('https://yts.ag/api/v2/list_movies.json?query_term=' + term + '&sort_by=year')
    .then(function(response) {
      cb(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}