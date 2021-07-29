
module.exports = () => {

  const superagent = require('superagent');

  const getGoogleAPIResultObj = async function(taskName) {
    let URL = `https://serpapi.com/search.json?engine=google&gl=us&hl=en`;
    try {
      const queryArguments = {
        api_key: process.env.SERP_API_KEY,
        q: taskName
      };

      const response = await superagent.get(URL).query(queryArguments);
      if (response.status >= 200 && response.status < 400) {
        return response.body;
      } else {
        console.log('Error');
      }

    } catch (error) {
      console.log(error.response.body);
    }

  };

  const categorizeTasks = async function(taskName) {
    const result =  await getGoogleAPIResultObj(taskName);
    let res = await taskCategory(JSON.stringify(result));
    return res;
  };


  const taskCategory = async function(APIResultJSON) {

    const counterObj = {};
    const str = String(APIResultJSON).toLowerCase();
    const moviesArray = ['hulu', 'amazon prime', 'youtube tv', 'google play movies & tv', 'imdb', 'rotten tomatoes', 'fiction', 'sci-fi', 'sci_fi', 'drama', 'movies', 'film', 'thriller', 'mystery', 'fantasy', 'adventure'];
    const seriesArray = ['hulu', 'amazon prime', 'youtube tv', 'google play movies & tv', 'imdb', 'rotten tomatoes', 'fiction', 'sci-fi', 'sci_fi', 'drama', 'series', 'thriller', 'mystery', 'fantasy', 'adventure'];
    const booksArray = ['book, periodical, comic'];
    const restaurantArray = ['restaurant'];
    const productArray = ['product'];

    let moviesCount = 0;
    let seriesCount = 0;
    let booksCount = 0;
    let restaurantsCount = 0;
    let productsCount = 0;

    moviesArray.forEach(element => {
      moviesCount += str.split(element).length - 1;
    });

    seriesArray.forEach(element => {
      seriesCount += str.split(element).length - 1;
    });

    booksArray.forEach(element => {
      booksCount += str.split(element).length - 1;
    });

    restaurantArray.forEach(element => {
      restaurantsCount += str.split(element).length - 1;
    });

    productArray.forEach(element => {
      productsCount += str.split(element).length - 1;
    });

    counterObj.Films = moviesCount;
    counterObj.Series = seriesCount;
    counterObj.Books = booksCount;
    counterObj.Restaurants = restaurantsCount;
    counterObj.Products = productsCount;

    let cat = Object.keys(counterObj).reduce((a, b) => counterObj[a] > counterObj[b] ? a : b);
    //return cat;
    if (cat==='Films') {
      return 1; // 1 corresponds to Films
    };
    if (cat==='Series') {
      return 2; // 2 corresponds to TV Series
    };
    if (cat==='Restaurants'){
      return 3; // 3 corresponds to Restaurants & Cafes
    };
    if (cat==='Books'){
      return 4; // 4 corresponds to Books
    };
    if (cat==='Products'){
      return 5; // 5 corresponds to Shopping & Other
    };
  };

  return { categorizeTasks };

};

