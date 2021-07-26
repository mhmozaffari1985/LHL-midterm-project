// Require the npm package for omdb-client
const omdbApi = require('omdb-client');


const params = {
    apiKey: '17b20cf',
    query: 'Harry Potter'
}

omdbApi.search(params, function(err, data) {

  console.log(data);
  if (!err) {
    for (const movie of data.Search){
      console.log(movie.Title);
    }
  } else {
    console.log(err);
  }

});

const isMovie = function (taskTitle, taskDescription) {

}
