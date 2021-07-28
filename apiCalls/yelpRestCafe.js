'use strict';

// So that I can use .env file with npm dotenv
require('dotenv').config({ path: '../.env' });

// Require the npm package for yelp-fusion:
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

client.search({
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca',
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});
