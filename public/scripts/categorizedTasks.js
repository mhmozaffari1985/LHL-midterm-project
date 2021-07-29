// Prints all tasks grouped by category

// 1. Function to create a single task element
const createTaskElement = function(data) {
  const $output = $('<article class="tasks lined thin">'); // Output is a tasks class article

  // Checkbox
  const $checkbox = $(`<button class="checkbox" onClick="checkTask(this, ${data.id})"></button>`);

  // Task Content Container
  const $taskContent = $('<div class="taskContent">');

  // Task Header Tags
  const $taskHeader = $('<header class="taskHeader">'); // Set task header tag
  const $taskTitle = $('<p class="taskTitle">').text(data.task_title); // Set p tag in task header
  // const $editTitle = $(`<div class="editTitle"><button onClick="editTitle(this, ${data.id})"><i class="far fa-edit"></i></button></div>`); // Set edit button for task title
  const $deleteTask = $(`<button class="deleteTask btn btn-danger" onClick="deleteTask(${data.id})">`).text('❌'); // Set delete button tag

  // Append Header Tags
  // $taskHeader.append($taskTitle).append($editTitle).append($deleteTask);
  $taskHeader.append($taskTitle).append($deleteTask);

  // Task Body Tags
  const $taskBody = $('<div class="taskBody">'); // Set div with task body class
  const $taskDescription = $('<p class="taskDescription">').text(data.task_description); // Set p with taskDescription class
  const $editButtons = $('<div class="editButtons">') // Set div with editButtons class
  const $editButton = $(`<button class="btn btn-outline-secondary" onClick="editTask(this, ${data.id})">`).html('<i class="far fa-edit"></i>'); // Edit button
  // const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${data.id})">`).html('<i class="far fa-save"></i>Save'); // Save button

  // Append Body Tags
  $editButtons.append($editButton)
  $taskBody.append($taskDescription).append($editButtons);

  // Append $output
  $taskContent.append($taskHeader).append($taskBody);
  $output.append($checkbox).append($taskContent);

  return $output;
};

// 2. Function to loop through example data set and render all tasks per category
const renderTasks = function(data) {

  const categories = [];
  // Populate categories
  for (const task of data) {
    if(!categories.includes(task.category_name)){
      categories.push(task.category_name)
    }
  }
  console.log(categories);

  $('#allTasks').html(''); // Clears default text

  // Code for custom number of columns
  const columns = 2; // Change this number to adjust number of columns.
  const rows = 3; // Math.ceil(categories.length/columns); // This code only matters if you have several categories. We only have 5!

  let categoryCounter = 0; // Needed for category data.

  // Loops through categories
  for (let i = 0; i < rows; i++) {
    let $row = $('<div class="row">');
    for (let j = 0; j < columns; j++) {
      let categoryName = categories[categoryCounter]; // Store category name

      // Uncategorized data.
      if (categoryName === null) {

        if(!categories.includes('Uncategorized')) {
          categories.push('Uncategorized')
        };
        let categoryTasks = data.filter(obj => obj.category_name === null);
        categoryTasks.forEach(obj => obj.category_name = 'Uncategorized');
      }

      // Only want category lists if there are items in that category
      if(categoryName) {
        // Each list is a column.
        let $categoryList = $('<section class="categoryList column thick lined">');
        let categoryTasks = data.filter(obj => obj.category_name === categoryName);

        // Creates tasks for each category.
        categoryTasks.forEach(obj => {
          $task = createTaskElement(obj); // calls createTaskElement for each task
          $categoryList.prepend($task); // takes return value and prepends (ensures order) it to the category name
        })
          // Set category name/ lined thick are classes for styling.
          let $categoryName = $(`<h2 class="categoryName lined thick ${categoryName}">`).text(categoryName);

          // Appending and prepending tags
          $categoryList.prepend($categoryName);
          $row.append($categoryList);
      }

      // Move to next category and append row to the allTasks section.
      categoryCounter++;
      $('#allTasks').append($row);
    }

    // Code for one column:
    // Loops through tasks
    // for (const someTask of data) {
    //   if(someTask.status_id === 1 && someTask.category_name === category) {
    //     $task = createTaskElement(someTask); // calls createTaskElement for each task
    //     $categoryList.prepend($task); // takes return value and prepends (ensures order) it to the category name
    //   }
    // }

    // $categoryList.prepend($categoryName);
    // $('#allTasks').append($categoryList);
  }

};

// 3. Create a function to do this directly from the database API
const loadTasks = function() {
  $.getJSON('/api/tasks', function(data) { // jQuery shorthand for Ajax
    renderTasks(data.tasks);
  });
};

// 4. Call load function
$(document).ready(function() {
  loadTasks();
});
