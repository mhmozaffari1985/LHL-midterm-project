// Require the npm package for google-books-search
const books = require('google-books-search');

// Function to categorize based on google books API. Maybe need to change to promise?
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

// Example Data
const exampleTitle = 'The Da Vinci Code';
const exampleString = 'Read this book';

// Example Runs
isBook(exampleTitle,exampleString);
isBook('askdjhasdkjhasd', 'asdkjhasdkjhasd');
isBook('Lord of the rings', 'asjkdhasdkj');
isBook('12 Angry men', 'asdkljhasdasds');
