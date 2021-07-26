// Require the npm package for omdb-client
const omdbApi = require('omdb-client');
const key = process.env.OMDB_API_KEY;
console.log(key);

omdbApi.search(params, function(err, data) {
  // process response...
});
