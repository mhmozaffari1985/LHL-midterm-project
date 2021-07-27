// Require the npm package for omdb-client
const omdbApi = require('omdb-client');
const key = '17b20cf';

// Function to categorize based on OMDB API. Maybe need to change to promise?
const isMovie = function (taskTitle, taskDesc) {
  taskTitle = taskTitle.toLowerCase().trim();
  taskDesc = taskDesc.toLowerCase().trim();

  const params = {
    apiKey: key,
    query: taskTitle
  }

  omdbApi.search(params, function(err, data) {
    if (!err) {
      for (const movie of data.Search){
        let type = movie.Type.toLowerCase();
        let omdbTitle = movie.Title.toLowerCase();
        if(type === 'movie' && omdbTitle === taskTitle) {
          console.log(`Movie found: ${movie.Title}`);
          return true;
        }
      }
      console.log(`No exact match found for: ${taskTitle}`)
      return false;
    } else {
      console.log(err); // If movie is not found, err === Movie not found!
      return false;
    }

  });

}

// Function to categorize based on OMDB API. Maybe need to change to promise?
const isSeries = function (taskTitle, taskDesc) {
  taskTitle = taskTitle.toLowerCase().trim();
  taskDesc = taskDesc.toLowerCase().trim();

  const params = {
    apiKey: key,
    query: taskTitle
  }

  omdbApi.search(params, function(err, data) {

    if (!err) {
      for (const series of data.Search){
        let type = series.Type.toLowerCase();
        let omdbTitle = series.Title.toLowerCase();
        if(type === 'series' && omdbTitle === taskTitle) {
          console.log(`Series found: ${series.Title}`);
          return true;
        }
      }
      console.log(`No exact match found for: ${taskTitle}`)
      return false;
    } else {
      console.log('Series not found!'); // Usual err is 'Movie not found!'
      return false;
    }

  });

}

// isMovie Tests
isMovie('Inception','Movie to watch');
isMovie('asdkjhasdj', 'asdjkhasd');
isMovie('Harry Potter and the chamber of secrets', 'some test');
isMovie('Harry Potter', 'askjdhasdkj');

// isShow Tests
isSeries('Seinfeld','Movie to watch');
isSeries('asdkjhasdj', 'asdjkhasd');
isSeries('Game of Thrones', 'some test');
isSeries('Loki', 'askjdhasdkj');
