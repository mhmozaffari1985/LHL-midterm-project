// Require the npm package for google-books-search
const books = require('google-books-search');

// Example Data
const exampleTitle = 'The Da Vinci Code';
const exampleString = 'Read this book';

// NPM Example Code:
// const options = {
//   field: 'title',
//   type: 'books',
//   order: 'relevance'
// };

// books.search("Professional JavaScript for Web Developers", options, function(error, results, apiResponse) { // Results returns an array
//   if ( ! error ) {
//     for (const book of results) {
//       console.log(book.title);
//     }
//   } else {
//       console.log(error);
//   }
// });

const isBook = function (bookTitle, bookDesc) {
  bookTitle = bookTitle.toLowerCase().trim();
  bookDesc = bookDesc.toLowerCase().trim();

  // Default options
  const options = {
    field: 'title',
    type: 'books',
    order: 'relevance'
  };

  // Search for books
  books.search(bookTitle, options, function(error, results) { // Results returns an array
    if ( ! error ) {
      for (const book of results) {
        let libBookTitle = book.title.toLowerCase();
        if (libBookTitle === bookTitle) {
          console.log ('Book found:', libBookTitle);
          return true;
        }
      }
      console.log ('No exact match.')
      return false;
    } else {
        console.log('No book.');
        return false;
    }
  });

}

// isBook(exampleTitle,exampleString);
// isBook('askdjhasdkjhasd', 'asdkjhasdkjhasd');
// isBook('Lord of the rings', 'asjkdhasdkj');
isBook('12 Angry men', 'asdkljhasdasds');
