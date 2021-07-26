// Test Script To Print User Names

$(document).ready(function() {
  $.getJSON('/api/users', function(data) {
    for (const user of data.users) {
      let $userName = $('<p>').text(user.name);
      $('body').append($userName);
    }
  });
});
