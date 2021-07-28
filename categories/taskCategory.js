const {isBook} = require ('./googleBooks');
const {isSeries, isMovie} = require ('./omdbMovies');
const {isRestoCafe} = require('./yelpRestCafe');

const addCategory = function (taskTitle,taskDesc) {

  return Promise.all([
    isMovie(taskTitle,taskDesc),
    isSeries(taskTitle,taskDesc),
    isRestoCafe(taskTitle,taskDesc),
    isBook(taskTitle,taskDesc)
  ])
  .then(res => {
    console.log(res);
    if (res[0]) {
      return 1; // 1 corresponds to Films
    }
    if (res[1]) {
      return 2; // 2 corresponds to TV Series
    }
    if (res[2]){
      return 3; // 3 corresponds to Restaurants and Cafes
    }
    if (res[3]){
      return 4; // 4 corresponds to Books
    }
  })
  .catch(err => {
    console.log(err);
    return 6; // If any errors, we categorize to other.
  })
};

addCategory('Inception','').then(data => console.log(data));
addCategory('Mistborn' ,'').then(data => console.log(data));
addCategory('Seinfeld','').then(data => console.log(data));
addCategory('Inception','').then(data => console.log(data));
addCategory('The Butcher Chef','').then(data => console.log(data));
