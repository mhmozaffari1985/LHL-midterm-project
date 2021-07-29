const {isBook} = require ('./googleBooks');
const {isSeries, isMovie} = require ('./omdbMovies');
const {isRestoCafe} = require('./yelpRestCafe');
const googleKnowledge = require ('./googleKnowledge');
const { categorizeTasks } = googleKnowledge();
const addCategory = async function (taskTitle,taskDesc) {
  const result = await categorizeTasks(taskTitle);
  // 1. Check keywords?

  // 2. Check exact APIs
  return Promise.all([
    isMovie(taskTitle,taskDesc),
    isSeries(taskTitle,taskDesc),
    isRestoCafe(taskTitle,taskDesc),
    isBook(taskTitle,taskDesc),
    result
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
    return res[4];
  })
  .catch(err => {
    console.log(err);
    return 5; // If any errors, we categorize to Products.
  })
};

// addCategory('Inception','').then(data => console.log(data));
// addCategory('Mistborn' ,'').then(data => console.log(data));
// addCategory('Seinfeld','').then(data => console.log(data));
// addCategory('Inception','').then(data => console.log(data));
// addCategory('The Butcher Chef','').then(data => console.log(data));
// addCategory('Chair','').then(data => console.log(data));
module.exports = {addCategory};
