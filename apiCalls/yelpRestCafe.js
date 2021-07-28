'use strict';

// Use .env file with npm dotenv
require('dotenv').config({ path: '../.env' });

// Require the npm package for yelp-fusion:
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

const isRestoCafe = function (taskTitle,taskDesc) {
  taskTitle = taskTitle.toLowerCase().trim();
  taskDesc = taskDesc.toLowerCase().trim();

  return new Promise ((resolve,reject) => {
    // Search in GTA
    client.search({
      term: taskTitle,
      location: 'Greater Toronto Area'
    }).then(response => {
      for (const restaurant of response.jsonBody.businesses){
        const restoName = restaurant.name.toLowerCase();
        if(restoName === taskTitle) {
          console.log(`Restaurant found: ${restaurant.name}`);
          return resolve(true);
        }
      }
      console.log(`No exact match found for: ${taskTitle}`)
      return resolve (false);
    }).catch(e => {
      console.log(`No restaurant found by the name: ${taskTitle}`);
      return resolve(false);
    });
  })
}

// Example runs
isRestoCafe('The Butcher Chef', 'asdjklhasdkjlasd').then(res => console.log(res));
isRestoCafe('Sukhothai', 'asdjklhasdkjlasd').then(res => console.log(res));
isRestoCafe('asdasdasdfdf', 'asdjklhasdkjlasd').then(res => console.log(res));
isRestoCafe('Blackstone Steakhouse and Grill', 'asdjklhasdkjlasd').then(res => console.log(res));
isRestoCafe('Kingston Iranian Restaurant', 'asdjklhasdkjlasd').then(res => console.log(res));



module.exports = {isRestoCafe};
