// So that I can use .env file with npm dotenv
require('dotenv').config({ path: '../.env' });

// Require the npm package for google-books-search
const books = require('google-books-search');
const key = process.env.GOOGLE_API_KEY;

// Function to categorize based on google books API. Maybe need to change to promise?
const isBook = function (taskTitle, taskDesc) {
  taskTitle = taskTitle.toLowerCase().trim();
  taskDesc = taskDesc.toLowerCase().trim();

  // Default options
  const options = {
    field: 'title',
    type: 'books',
    order: 'relevance'
  };

  // Search for books

  return new Promise ((resolve,reject) => {

    books.search(taskTitle, options, function(error, results) { // Results returns an array
      if ( ! error ) {
        for (const book of results) {
          let libBookTitle = book.title.toLowerCase();
          if (libBookTitle === taskTitle) {
            console.log (`Book found: ${libBookTitle}`);
            return resolve(true);
          }
        }
        console.log (`No exact match for '${taskTitle}'.`)
        return resolve(false);
      } else {
        console.log(`No book found by that name: ${taskTitle}`);
        return resolve(false);
      }
    });

  })
}

// // Example Runs
// isBook('The Da Vinci Code','Read this book').then(res => console.log(res));
// isBook('askdjhasdkjhasd', 'asdkjhasdkjhasd');
// isBook('Lord of the rings', 'asjkdhasdkj');
// (isBook('12 Angry men', 'asdkljhasdasds'));

module.exports = {isBook};
