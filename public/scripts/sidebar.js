$(document).ready(() => {
  const pathname = location.pathname.split('/').splice(-1);
  $tasks = $($('.sidebarNav').children()).children()[0]
  $category = $($('.sidebarNav').children()).children()[1];
  $subcategory = $($('.sidebarNav').children()).children()[2];
  $film = $($subcategory).children()[0];
  $tv = $($subcategory).children()[1];
  $eat = $($subcategory).children()[2];
  $book = $($subcategory).children()[3];
  $other = $($subcategory).children()[4];

  if (pathname[0] === 'tasks') {
    // console.log($tasks, $category)
    $($tasks).addClass('active')
  } else if (pathname[0] === 'categories') {
    $($category).addClass('active');
  } else if (pathname[0] === 'Films') {
    $($film).addClass('active');
  } else if (pathname[0] === 'TVSeries') {
    $($tv).addClass('active');
  } else if (pathname[0] === 'RestoCafe') {
    $($eat).addClass('active');
  } else if (pathname[0] === 'Books') {
    $($book).addClass('active');
  } else if (pathname[0] === 'Other') {
    $($other).addClass('active');
  }
})